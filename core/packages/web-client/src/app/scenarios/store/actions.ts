import { ROOT_API_URL } from "../../constants";
import axios from "axios";
import { ScenariosActionTypes } from "./types";
import { ScenarioJSON } from "ditto-shared";
import { ApplicationState } from "../../types";
import Scenarios from "../Scenarios";
const ROOT_URL_SCENARIOS = `${ROOT_API_URL}/scenarios`;
const ROOT_URL_TESTS = `${ROOT_API_URL}/test/play`;



export function createScenario(values) {

  return async dispatch => {
    dispatch({ type: ScenariosActionTypes.SCENARIO_CREATION_STARTED });
    try {
      const response = await axios.post(ROOT_URL_SCENARIOS, values);
      dispatch({ type: ScenariosActionTypes.SCENARIO_CREATION_SUCCEEDED, scenario: response.data });

    } catch (e) {
      dispatch({ type: ScenariosActionTypes.SCENARIO_CREATION_FAILED, error: e });
      console.log(e.response);

    }

  }
}


export function fetchScenarios() {
  return async dispatch => {
    try {
      const scenarios: ScenarioJSON[] = (await axios.get(ROOT_URL_SCENARIOS)).data;
      dispatch(receiveScenarios(scenarios));

    } catch (error) {
      console.log(error);

    }
  }
}



export function receiveScenarios(scenarios: ScenarioJSON[]) {
  return {
    type: ScenariosActionTypes.RECIEVE_SCENARIOS,
    scenarios
  }
}

export function fetchScenario(scenarioId: string) {
  return async (dispatch, getState: () => ApplicationState) => {
    let selectedScenario = getState().scenarios.all.find(scenario => scenario._id === scenarioId);
    if (!selectedScenario) {
      try {
        selectedScenario = (await axios.get(`${ROOT_URL_SCENARIOS}/${scenarioId}`)).data;
      } catch (error) {
        console.log(error);
        return;
      }
    }
    dispatch(receiveScenario(selectedScenario as ScenarioJSON));
  }
}

export function receiveScenario(scenario: ScenarioJSON) {
  return {
    type: ScenariosActionTypes.RECIEVE_SCENARIO,
    scenario
  }
}

export function playScenario(scenario: ScenarioJSON) {
  return async (dispatch, getState: () => ApplicationState) => {
    const environment = getState().environments.selected;

    if (environment === undefined) {
      dispatch({ type: ScenariosActionTypes.SCENARIO_PLAY_FAILED, reason: "Please select environment" });
    }
    else {
      try {
        const response = await axios.post(ROOT_URL_TESTS, {
          scenarioId: scenario._id,
          environmentId: environment._id
        });
        dispatch({ type: ScenariosActionTypes.SCENARIO_PLAY_SUCCEEDED, response: response.data });

      } catch (error) {
        dispatch({ type: ScenariosActionTypes.SCENARIO_PLAY_FAILED, reason: error });
      }

    }
  }
}