import { EnvironmentsState } from "./environments/store/types";
import { SimulatorsState } from "./simulators/store/types";
import { ScenariosState } from "./scenarios/store/types";
import { combineReducers } from "redux";
import { environmentReducer } from "./environments/store/reducer";
import { simulatorReducer } from "./simulators/store/reducer";
import {reducer as formReducer } from "redux-form";
import { scenarioReducer } from "./scenarios/store/reducer";

export interface ApplicationState {
    environments: EnvironmentsState,
    simulators : SimulatorsState,
    scenarios : ScenariosState,
    form : any
}

export const rootReducer = combineReducers<ApplicationState>({
    simulators: simulatorReducer,
    environments: environmentReducer,
    scenarios : scenarioReducer,
    form : formReducer
  })