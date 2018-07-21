import { SimulatorsAction } from "../actions";
import { FETCH_SIMULATORS } from "../constants";
import { SimulatorId } from "../../../simulations-manager/src/simulators/SimulatorId";




export const simulatorReducer = (state: SimulatorId[] = [], action: SimulatorsAction): SimulatorId[] => {
    switch (action.type) {
        case FETCH_SIMULATORS:
            return action.payload.data;
        default:
            return state;
    }
}