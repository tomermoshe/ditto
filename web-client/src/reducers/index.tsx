import { combineReducers } from "redux";
import {simulatorReducer} from "./simulatorsReducer";


const rootReducer = combineReducers({
    simulators: simulatorReducer
});

export default rootReducer;