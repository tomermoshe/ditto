import { ROOT_API_URL } from "../../constants";
import { SimulatorDefinition } from "ditto-shared";
import axios, { AxiosError } from "axios";
import { SimulatorActionTypes } from "./types";

const ROOT_URL_SIMULATORS = `${ROOT_API_URL}/simulators`;


export function fetchSimulators() {
  return async dispatch => {
    try {
      const simulators: SimulatorDefinition[] = (await axios.get(ROOT_URL_SIMULATORS)).data;
      dispatch(receiveSimulators(simulators));

    } catch (error) {
      console.log(error);

    }
  }
}

export function receiveSimulators(simulators: SimulatorDefinition[]) {
  return {
    type: SimulatorActionTypes.RECIEVE_SIMULATORS,
    simulators
  }
}

export function clearCreationStatus(){
  return {
    type:SimulatorActionTypes.CLEAR_CREATION_STATUS
  }
}


export function createSimulator(values) {

  return async dispatch => {

    try {
      dispatch({ type: SimulatorActionTypes.SIMULATOR_CREATION_STARTED });
      await axios.post(ROOT_URL_SIMULATORS, values);
      dispatch({ type: SimulatorActionTypes.SIMULATOR_CREATION_SUCCEEDED });

    } catch (error) {
      let message: string = "There was an error submitting the form";
      if (error.response) {
        message = `${message} ${error.response.data}`;
      } else if (error.request) {
        message += " the server didn't responded";
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
   
      dispatch({ type: SimulatorActionTypes.SIMULATOR_CREATION_FAILED, error: message });

    }
  }

}
