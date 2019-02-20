source choose_env.sh
choose_env
echo "building for $env started"
docker build --rm -f "../packages/simulations-manager/Dockerfile.$env" -t simulations-manager-$env:latest ../packages/simulations-manager
if [ $env != "dev" ]; then
    docker build --rm -f "../packages/web-client/Dockerfile.$env" -t web-client-$env:latest ../packages/web-client
fi
echo "building for $env finished" 
