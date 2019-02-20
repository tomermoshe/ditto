#!/bin/bash

source choose_env.sh
choose_env

if [ $env = "dev" ]; then
    echo "There is now reason to package dev o0"
    exit
fi

echo "packaging for $env started"

package=ditto_"$env"
mkdir $package
mkdir "$package"/docker_images
mkdir "$package"/scripts

docker save -o "$package"/docker_images/simulations-manager.tar simulations-manager-$env:latest
docker save -o "$package"/docker_images/web-client.tar web-client-$env:latest
docker save -o "$package"/docker_images/socat.tar bobrik/socat:latest
docker save -o "$package"/docker_images/mongo.tar mongo:latest

cp ditto-run ditto-stop  "$package"/scripts
cp install.sh $package
cp docker-compose-stack-"$env".yml "$package"/scripts/docker-compose-stack.yml
zip -r ditto_"$env".zip "$package"/*
rm -r "$package"

echo "packaging for $env finished"
