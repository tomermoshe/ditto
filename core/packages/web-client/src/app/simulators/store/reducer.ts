import { SimulatorsState } from "./types";
import { Reducer } from "redux";
import { SimulatorActionTypes } from "./types";

const initialState: SimulatorsState = { all: [], creationStatus: undefined };


export const simulatorReducer: Reducer<SimulatorsState> = (state: SimulatorsState = initialState,
    action) => {

    switch (action.type) {
        case SimulatorActionTypes.RECIEVE_SIMULATORS:
            return {
                ...state,
                all: action.simulators
            };
        case SimulatorActionTypes.SIMULATOR_CREATION_SUCCEEDED:
            return {
                ...state,
                creationStatus: {
                    status: "succeded"
                }
            };
        case SimulatorActionTypes.SIMULATOR_CREATION_FAILED:
            return {
                ...state,
                creationStatus: {
                    status: "failed",
                    message: action.error
                }
            }
        case SimulatorActionTypes.CLEAR_CREATION_STATUS:
            return {
                ...state,
                creationStatus: undefined
            }

        default:
            return state;
    }
}