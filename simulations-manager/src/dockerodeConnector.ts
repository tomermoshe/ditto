import Dockerode from "dockerode";

export const dockerode = new Dockerode({ host: "http://localhost", port: 4243 });
