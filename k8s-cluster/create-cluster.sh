#/bin/bash

issuer_email="tanelsaar99@gmail.com"

# Add Cert Manager to cluster
kubectl apply -f cert-manager.yaml

# Create letsencrypt cluster issuer
sed -i "s/email.*$/email: $issuer_email/g" cluster-issuer.yaml
kubectl apply -f cluster-issuer.yaml

# Create Traefik namespace
kubectl create ns traefik

# Add traefik to local helm repository
helm repo add traefik https://helm.traefik.io/traefik

# Update local helm repository
helm repo update

# Install Traefik loadbalancer to k8s namespace named traefik
helm install --namespace=traefik traefik traefik/traefik