import { SimulatorsAction } from "../actions";
import { RECIEVE_SIMULATORS } from "../constants";
import { SimulatorConfig } from "../../../simulations-manager/src/simulators/simulatorConfig";




export const simulatorReducer = (state: SimulatorConfig[] = [], action: SimulatorsAction): SimulatorConfig[] => {
    switch (action.type) {
        case RECIEVE_SIMULATORS:
            return action.simulators;
        default:
            return state;
    }
}