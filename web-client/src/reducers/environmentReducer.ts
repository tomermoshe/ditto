import { RECIEVE_ENVIRONMENTS ,ENVIRONMENT_CREATION_SUCCEEDED} from "../constants";
import { Environment } from "../../../simulations-manager/src/environments/Environment";




export const environmentReducer = (state: Environment[] = [],
    action: any): Environment[] => {
        
    switch (action.type) {
        case RECIEVE_ENVIRONMENTS:
            return action.environments;
        case ENVIRONMENT_CREATION_SUCCEEDED:
            return [...state.filter((env) => !(Object.keys(env).length === 0)), action.payload]
        default:
            return state;
    }
}