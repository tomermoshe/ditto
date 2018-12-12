import { SimulatorId } from "./SimulatorId";

export interface SimulatorInstanceId {
    name: string;
    id: SimulatorId;
    configuration?: object;
}
