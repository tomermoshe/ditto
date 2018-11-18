import {ROOT_URL} from "../../constants";
import axios from "axios";
import { ScenariosActionTypes } from "./types";
import { Scenario } from "../../../../../simulations-manager/src/scenarios/Scenario";
const  ROOT_URL_SCENARIOS = `${ROOT_URL}/scenarios`;



export function createScenario(values) {
  
    return async dispatch => {
      dispatch({ type: ScenariosActionTypes.SCENARIO_CREATION_STARTED });
      try {
        const response = await axios.post(ROOT_URL_SCENARIOS, values);
        dispatch({ type: ScenariosActionTypes.SCENARIO_CREATION_SUCCEEDED, payload: response.data });
      } catch (e) {
        dispatch({ type: ScenariosActionTypes.SCENARIO_CREATION_FAILED, error: e });
        console.log(e.response);
        
      }
  
    }
  }
  

  export function fetchScenarios() {
    return async dispatch => {
      try {
        const scenarios: Scenario[] = (await axios.get(ROOT_URL_SCENARIOS)).data;
        dispatch(receiveScenarios(scenarios));
  
      } catch (error) {
        console.log(error);
  
      }
    }
  }

  export function receiveScenarios(scenarios: Scenario[]) {
    return {
      type: ScenariosActionTypes.RECIEVE_SCENARIOS,
      scenarios
    }
  }