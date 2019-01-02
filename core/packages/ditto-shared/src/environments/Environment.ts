import { SimulatorInstanceId } from "../simulators/SimulatorInstanceId";

export interface Environment {
    name: string;
    simulators: Array<SimulatorInstanceId>;
}

export interface PEnvironment<IdType> extends Environment {
    _id: IdType;
}
export type EnvironmentJSON = PEnvironment<string>;
