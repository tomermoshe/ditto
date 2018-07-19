import { SimulatorsAction } from "../actions";
import { FETCH_SIMULATOR_NAMES } from "../constants";




export default function (
    state: string[] = [],
    action: SimulatorsAction
): string[] {
    switch (action.type) {
        case FETCH_SIMULATOR_NAMES:
            return action.payload.data;
        default:
            return state;
    }
}