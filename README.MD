# js-app

Tauri's js-app school project

 - Application is built with Docker and image hosted in Dockerhub
 - Kubernetes cluster is hosted in vultr and created with Terraform
	 - Kubernetes cluster has Letsencrypt certificate issuer and Traefik loadbalancer
 - Domain is hosted in Zone.ee

# Build Application
Application is built with Docker and image hosted in Dockerhub

## Configure Dockerhub credentials
Create local credentials at `~/.docker/config.json` with your Dockerhub username and password:
 `$ docker login`
## Build Application container image

Make changes to your code in the `application/` folder to change the behaviour of your js application.
To make changes to the image build process, edit the `application/Dockerfile` file:

    FROM node
    WORKDIR /usr/src/app
    COPY package.json package-lock.json ./
    RUN npm install
    COPY . .
    EXPOSE 4000
    CMD [ "npm", "start" ]
 
To build the image, run:
 `$ docker build . -t <dockerhub-username>/<dockerhub-repository>:<application-image-tag>`
 To push your application image
  `$ docker push <dockerhub-username>/<dockerhub-repository>:<application-image-tag>`

## Build Database container image

Make changes to the files in the `database/` folder to change the behaviour of your database.
To make changes to the image build process, edit the `database/Dockerfile` file:

    #Create MySQL Image for JSP Tutorial Application
    FROM mysql
    RUN chown -R mysql:root /var/lib/mysql/
    ENV MYSQL_ALLOW_EMPTY_PASSWORD true
    ADD data.sql /etc/mysql/data.sql
    RUN cp /etc/mysql/data.sql /docker-entrypoint-initdb.d
    EXPOSE 3306

To build the image, run:
 `$ docker build . -t <dockerhub-username>/<dockerhub-repository>:<database-image-tag>`
 To push your database image
  `$ docker push <dockerhub-username>/<dockerhub-repository>:<database-image-tag>`
P.S! Ensure that the `CREATE DATABASE` database name and `GRANT`   database login matches the `manifests/deploy-k8s.sh` scripts environment variables.

# Create and configure k8s cluster
To create a Kubernetes cluster we are using the vultr service provider and Terraform
## Create managed cluster
Edit `k8s-cluster/provider.tf` to add your vultr API key to the configuration:

    provider  "vultr" {
	    api_key = "<vultr-api-key>"
	    rate_limit = 100
	    retry_limit = 3
    }

Initialize Terraform to download the required providers for your cluster
`$ terraform init`

Apply the Terraform code
`$ terraform apply -auto-approve`

When the cluster has been created you have to download the kubeconfig file from the vultr dashboard and add it to `~/.kube/config` to access the cluster with the `kubectl` utility

## Configure k8s cluster
For our load balancer, we are using `Traefik` and as our certificate issuer, `Letsencrypt`
Change  your email environment variable at `k8s-cluster/create-cluster.sh` and then run the script to add the required components.
P.S! Setting websecure redirection in Traefik will break cert-manager

# Deploy your application and database
The manifests and deployment script are under `manifests/` folder.
Edit the script at `manifests/deploy-k8s.sh` and set your environment variables accordingly

    namespace="<kubernetes-namespace>"
    db_user=superman #needs to match GRANT login value in database/data.sql
    db_password=<mysql-database-password>
    DB_DATABASE=my_db #needs to match GRANT and CREATE DATABASE login value in database/data.sql
    OPEN_WEATHER_API_KEY=<application-key>
    SESSION_SECRET=<application-key>

Run the shell script to deploy the resources `$ manifests/deploy-k8s.sh`
After the Kubernetes Pod is deployed (can be checked with `kubectl -n <namespace> get pods`) and ready, you should be able to access the application on the URI specified at `manifest/js-app-deployment.yaml` Ingress

You can add secure redirection for Traefik aswell with 
`helm upgrade --namespace=traefik traefik traefik/traefik --set 'ports.web.redirectTo.port=websecure'`

You should do this after your application has been deployed, since cert-manager is unable to get ACME information from cluster if port 80 does not respond...