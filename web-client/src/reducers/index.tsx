import { combineReducers } from "redux";
import {simulatorReducer} from "./simulatorsReducer";
import {reducer as formReducer } from "redux-form";
import { environmentReducer } from "./environmentReducer";


const rootReducer = combineReducers({
    simulators: simulatorReducer,
    environments: environmentReducer,
    form : formReducer
});

export default rootReducer;