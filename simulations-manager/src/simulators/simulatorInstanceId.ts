import { SimulatorId } from "./simulatorId";

export interface SimulatorInstanceId {
    name: string;
    id: SimulatorId;
    // envs?: string[];
    configuration: object;
}
