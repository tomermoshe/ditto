import { combineReducers } from "redux";
import {simulatorReducer} from "./simulatorsReducer";
import {reducer as formReducer } from "redux-form";


const rootReducer = combineReducers({
    simulators: simulatorReducer,
    form : formReducer
});

export default rootReducer;