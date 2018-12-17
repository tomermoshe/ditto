export class NetworksPool {
    private pool: string[];
    constructor() {
        this.pool = ["ditto-1", "ditto-2", "ditto-3"];
    }
    acquire(): string {
        return this.pool.pop();
    }
    release(network: string) {
        return this.pool.push(network);
    }
}