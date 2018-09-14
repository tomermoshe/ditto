import { SimulatorInstanceId } from "../simulators/simulatorInstanceId";

export interface Environment {
    name: string;
    simulators: Array<SimulatorInstanceId>;
}

