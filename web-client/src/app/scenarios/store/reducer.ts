import { ScenariosActionTypes, ScenariosState } from "./types";
import { Reducer } from "redux";

const initialState: ScenariosState = {
    all: []
}

export const scenarioReducer: Reducer<ScenariosState> =
    (state: ScenariosState = initialState, { type, scenarios }) => {
        switch (type) {

            case ScenariosActionTypes.RECIEVE_SCENARIOS:
                return { ...state, all: [...scenarios] };

            default:
                return state;
        }
    }
