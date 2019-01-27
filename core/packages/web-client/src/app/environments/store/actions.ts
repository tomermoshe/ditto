import axios from "axios";
import { ROOT_API_URL } from "./../../constants";
import { EnvironmentActionTypes } from "./types";
import { EnvironmentJSON } from "ditto-shared";


const ROOT_URL_ENVIRONMENTS = `${ROOT_API_URL}/environments`;


export function createEnvironment(values) {

  return async dispatch => {
    dispatch({ type: EnvironmentActionTypes.ENVIRONMENT_CREATION_STARTED });
    try {
      const response = await axios.post(ROOT_URL_ENVIRONMENTS, values);
      dispatch({ type: EnvironmentActionTypes.ENVIRONMENT_CREATION_SUCCEEDED, environment: response.data });
    } catch (e) {
      dispatch({ type: EnvironmentActionTypes.ENVIRONMENT_CREATION_FAILED, error: e });
    }

  }
}

export function updateEnvironment(environmentId, values) {
  return async dispatch => {
    dispatch({ type: EnvironmentActionTypes.ENVIRONMENT_UPDATE_STARTED });
    try {
      const response = await axios.post(`${ROOT_URL_ENVIRONMENTS}/${environmentId}`, values);
      dispatch({ type: EnvironmentActionTypes.ENVIRONMENT_UPDATE_SUCCEEDED, environment: response.data });
    } catch (e) {
      dispatch({ type: EnvironmentActionTypes.ENVIRONMENT_UPDATE_FAILED, error: e });
    }
  }
}

export function deleteEnvironment(environmentId) {
  return async dispatch => {
    dispatch({ type: EnvironmentActionTypes.ENVIRONMENT_DELETION_STARTED });
    try {
      await axios.delete(`${ROOT_URL_ENVIRONMENTS}/${environmentId}`);
      dispatch({ type: EnvironmentActionTypes.ENVIRONMENT_DELETION_SUCCEEDED, environmentId });
    } catch (e) {
      dispatch({ type: EnvironmentActionTypes.ENVIRONMENT_DELETION_FAILED, error: e });
    }
  }
}



export function fetchEnvironments() {
  return async dispatch => {
    try {
      const environments: EnvironmentJSON[] = (await axios.get(ROOT_URL_ENVIRONMENTS)).data;
      dispatch(receiveEnvironments(environments));

    } catch (error) {
      console.log(error);

    }
  }
}

export function receiveEnvironments(environments: EnvironmentJSON[]) {
  return {
    type: EnvironmentActionTypes.RECIEVE_ENVIRONMENTS,
    environments
  }
}

export function selectEnvironment(environment: EnvironmentJSON) {
  return {
    type: EnvironmentActionTypes.ENVIRONMENT_SELECTED,
    selected: environment
  }
}

