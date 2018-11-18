import { SimulatorsState } from "./types";
import { Reducer } from "redux";
import {SimulatorActionTypes} from "./types";

const initialState: SimulatorsState = [];


export const simulatorReducer : Reducer<SimulatorsState> = (state: SimulatorsState = initialState,
    action) => {
        
    switch (action.type) {
        case SimulatorActionTypes.RECIEVE_SIMULATORS:
            return action.simulators;
        default:
            return state;
    }
}