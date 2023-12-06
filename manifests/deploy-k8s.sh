#!/bin/bash

# Set k8s namespace variable, db_user and db_password
namespace="js-app"
db_user=superman
db_password=
DB_DATABASE=my_db
OPEN_WEATHER_API_KEY=
SESSION_SECRET=

# Create k8s namespace
kubectl create namespace $namespace

# Change the connection database name in .env file
sed -i "s/DB_DATABASE.*$/DB_DATABASE=$DB_DATABASE/g" .env

# Change namespace name in k8s manifest
sed -i "s/namespace.*$/namespace: $namespace/g" js-app-deployment.yaml

# Change db_user and db_password in .env file
sed -i "s/DB_USER.*$/DB_USER=$db_user/g" .env
sed -i "s/DB_PASSWORD.*$/DB_PASSWORD=$db_password/g" .env

# Change api keys in .env file
sed -i "s/OPEN_WEATHER_API_KEY.*$/OPEN_WEATHER_API_KEY=$OPEN_WEATHER_API_KEY/g" .env
sed -i "s/SESSION_SECRET.*$/SESSION_SECRET=$SESSION_SECRET/g" .env

# Create db-password and db-user for MySQL instance
kubectl -n $namespace create secret generic db-password --from-literal=db-password="$db_password"
kubectl -n $namespace create secret generic db-user --from-literal=db-user="$db_user"

# Create .env secret file for js application
kubectl -n $namespace create secret generic app-env --from-file=.env

# Deploy application and database k8s manifest

kubectl -n $namespace apply -f js-app-deployment.yaml