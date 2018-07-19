import { combineReducers } from "redux";
import SimulatorsReducer from "./simulatorsReducer";
export type SimulatorsState ={
    readonly simulators: string[];
};

const rootReducer = combineReducers<SimulatorsState>({
    simulators: SimulatorsReducer
});

export default rootReducer;