import { EnvironmentActionTypes, EnvironmentsState } from "./types";
import { Reducer } from "redux";


const initialState: EnvironmentsState = {
    all: [],
    selected: undefined
}
export const environmentReducer : Reducer<EnvironmentsState> = (state: EnvironmentsState = initialState, action) => {

    switch (action.type) {
        case EnvironmentActionTypes.RECIEVE_ENVIRONMENTS:
            return { ...state, all: action.environments }
        case EnvironmentActionTypes.ENVIRONMENT_CREATION_SUCCEEDED:
            return { ...state, all: [...filterEmptyEnvironments(state), action.environment] }
        case  EnvironmentActionTypes.ENVIRONMENT_SELECTED: 
            return { ...state , selected: action.selected}
        default:
            return state;
    }
}

function filterEmptyEnvironments(state: EnvironmentsState) {
    return state.all.filter(((env) => !(Object.keys(env).length === 0)));
}
