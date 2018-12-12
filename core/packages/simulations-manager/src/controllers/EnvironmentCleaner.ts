import { dockerode } from "../connectors/DockerodeConnector";

export class EnvironmentCleaner {
    constructor() {

    }

    initialize() {
        setInterval(() => dockerode.removeExitedContainers(), 60000);
    }
}