import Dockerode, { Container, ContainerInspectInfo, ContainerInfo } from "dockerode";



class DockerodeExtension extends Dockerode {
    getContainerIdByName(name: string) {

        // filter by name
        const opts = {
            "limit": 1,
            "filters": `{"name": ["${name}"]}`
        };

        return new Promise<string>((resolve, reject) => {
            this.listContainers(opts, function (err, containers) {
                if (err) {
                    reject(err);
                } else {
                    resolve(containers && containers[0].Id);
                }
            });
        });
    }
}

export const dockerode = new DockerodeExtension({ host: "http://172.17.0.1", port: 4243 });
