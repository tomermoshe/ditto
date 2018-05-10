import Dockerode from "dockerode";

export const dockerode = new Dockerode({ host: "http://192.168.99.100", port: 2376 });
