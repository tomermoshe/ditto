npm --prefix ../packages/web-client run build
docker build --rm -f "../packages/simulations-manager/Dockerfile.prod" -t simulations-manager-prod:latest ../packages/simulations-manager
docker build --rm -f "../packages/web-client/Dockerfile" -t web-client-prod:latest ../packages/web-client