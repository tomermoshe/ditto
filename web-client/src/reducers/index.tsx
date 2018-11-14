import { combineReducers } from "redux";
import {simulatorReducer} from "./simulatorsReducer";
import {reducer as formReducer } from "redux-form";
import { environmentReducer } from "./environmentReducer";
import {  selectedEnvironmentReducer } from "./selectedEnvironmentReducer";


const rootReducer = combineReducers({
    simulators: simulatorReducer,
    environments: environmentReducer,
    selectedEnvironment : selectedEnvironmentReducer,
    form : formReducer
});

export default rootReducer;