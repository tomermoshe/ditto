import { dockerode } from "../connectors/dockerodeConnector";

export class EnvironmentCleaner {
    constructor() {

    }

    initialize() {
        setInterval(() => dockerode.removeExitedContainers(), 60000);
    }
}