import { dockerode } from "../connectors/DockerodeConnector";


export class NetworksPool {
    private pool: string[];
    constructor(networks: string[]) {
        this.pool = networks;
    }


    acquire(): string {
        const network = this.pool.pop();
        console.log(`acquired network ${network}`);
        return network;
    }
    release(network: string) {
        console.log(`released network id ${network}`);

        return this.pool.push(network);
}
}

export let networksPool: NetworksPool;

dockerode.getNetworksByName("ditto-").then(nets => {
    networksPool = new NetworksPool(nets.map(network => network.Name));
}).catch(e => {
    throw new Error(e);
});

