import { ScenariosActionTypes, ScenariosState } from "./types";
import { Reducer } from "redux";

const initialState: ScenariosState = {
    all: [],
    selected: undefined
}

export const scenarioReducer: Reducer<ScenariosState> =
    (state: ScenariosState = initialState, action) => {
        switch (action.type) {

            case ScenariosActionTypes.RECIEVE_SCENARIOS:
                return { ...state, all: [...action.scenarios] };
            case ScenariosActionTypes.SCENARIO_CREATION_SUCCEEDED:
                return { ...state, all: [...state.all, action.scenario] };
            case ScenariosActionTypes.RECIEVE_SCENARIO:
                return { ...state, selected: action.scenario };
            case ScenariosActionTypes.SCENARIO_UPDATE_SUCCEEDED:
                return {
                    ...state,
                    all: state.all.map((scenario) => scenario._id === action.scenario._id ?
                        action.scenario : scenario),
                    selected: state.selected && state.selected._id === action.scenario._id ?
                        action.scenario : state.selected
                }
                case ScenariosActionTypes.SCENARIO_DELETE_SUCCEEDED:
                return {
                    ...state,
                    all: [...state.all].filter((scenario) => scenario._id !== action.scenarioId),
                    selected: state.selected && state.selected._id === action.scenarioId ?
                        undefined : state.selected
                }
            default:
                return state;
        }
    }
