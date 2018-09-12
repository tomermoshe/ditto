import { SimulatorsAction } from "../actions";
import { RECIEVE_SIMULATORS } from "../constants";
import { SimulatorDefinition } from "../../../simulations-manager/src/simulators/simulatorDefinition";




export const simulatorReducer = (state: SimulatorDefinition[] = [],
    action: SimulatorsAction): SimulatorDefinition[] => {
        
    switch (action.type) {
        case RECIEVE_SIMULATORS:
            return action.simulators;
        default:
            return state;
    }
}