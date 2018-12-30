import { ScenariosActionTypes, ScenariosState } from "./types";
import { Reducer } from "redux";

const initialState: ScenariosState = {
    all: [],
    selected : undefined
}

export const scenarioReducer: Reducer<ScenariosState> =
    (state: ScenariosState = initialState, action) => {
        switch (action.type) {

            case ScenariosActionTypes.RECIEVE_SCENARIOS:
                return { ...state, all: [...action.scenarios] };
            case ScenariosActionTypes.SCENARIO_CREATION_SUCCEEDED:
                return {...state, all:[...state.all, action.scenario]};
            case  ScenariosActionTypes.RECIEVE_SCENARIO:
                return {...state , selected : action.scenario};
            default:
                return state;
        }
    }
