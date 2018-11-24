import { SimulatorInstanceId } from "../simulators/simulatorInstanceId";

export interface Environment {
    name: string;
    simulators: Array<SimulatorInstanceId>;
}

interface PEnvironment<IdType> extends Environment {
    _id: IdType;
}
export type EnvironmentJSON = PEnvironment<string>;
