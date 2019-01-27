import { EnvironmentActionTypes, EnvironmentsState } from "./types";
import { Reducer } from "redux";


const initialState: EnvironmentsState = {
    all: [],
    selected: undefined
}
export const environmentReducer: Reducer<EnvironmentsState> = (state: EnvironmentsState = initialState, action) => {

    switch (action.type) {
        case EnvironmentActionTypes.RECIEVE_ENVIRONMENTS:
            return { ...state, all: action.environments }
        case EnvironmentActionTypes.ENVIRONMENT_CREATION_SUCCEEDED:
            return { ...state, all: [...filterEmptyEnvironments(state), action.environment] }
        case EnvironmentActionTypes.ENVIRONMENT_SELECTED:
            return { ...state, selected: action.selected }
        case EnvironmentActionTypes.ENVIRONMENT_UPDATE_SUCCEEDED:
            const updateEnv = action.environment;
            return {
                ...state, all: [...state.all].
                    map((env => env._id === updateEnv._id ? updateEnv : env))
            }
        case EnvironmentActionTypes.ENVIRONMENT_DELETION_SUCCEEDED:
            return {
                ...state,
                all: state.all.filter((env) => env._id !== action.environmentId),
                selected: state.selected &&
                    state.selected._id !== action.environmentId ? state.selected : undefined
            }
        default:
            return state;
    }
}

function filterEmptyEnvironments(state: EnvironmentsState) {
    return state.all.filter(((env) => !(Object.keys(env).length === 0)));
}
