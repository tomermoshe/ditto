import {ENVIRONMENT_SELECTED } from "../constants";
import { Environment } from "../../../simulations-manager/src/environments/Environment";




export const selectedEnvironmentReducer = (state: Environment | null = null,
    action: any): Environment | null => {
    switch (action.type) {
        case ENVIRONMENT_SELECTED:
            return action.selectedEnvironment;
        default:
            return state;
    }
}