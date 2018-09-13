import {  EnvironmentsAction } from "../actions";
import { RECIEVE_ENVIRONMENTS } from "../constants";
import { Environment } from "../../../simulations-manager/src/environments/Environment";




export const simulatorReducer = (state: Environment[] = [],
    action: EnvironmentsAction): Environment[] => {
        console.log(action);
        
    switch (action.type) {
        case RECIEVE_ENVIRONMENTS:
            return action.environments;
        default:
            return state;
    }
}