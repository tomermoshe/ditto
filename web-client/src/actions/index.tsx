import * as constants from "../constants";
import axios, { AxiosResponse } from "axios";
import { SimulatorDefinition } from "../../../simulations-manager/src/simulators/simulatorDefinition";

import { Environment } from "../../../simulations-manager/src/environments/Environment";

const ROOT_URL = "http://172.17.0.1/api";

export type SimulatorsAction = ReturnType<typeof receiveSimulators>;
export type EnvironmentsAction = ReturnType<typeof receiveEnvironments>;






export function fetchSimulators() {
  return async dispatch => {
    try {
      const simulators: SimulatorDefinition[] = (await axios.get(`${ROOT_URL}/simulators`)).data;
      dispatch(receiveSimulators(simulators));

    } catch (error) {
      console.log(error);
      
    }
  }
}

export function receiveSimulators(simulators : SimulatorDefinition[]){
  return{
    type: constants.RECIEVE_SIMULATORS,
    simulators
  }
}



export function createEnvironment(values){
  console.log(values);
  
  return async dispatch => {
    dispatch({type: constants.ENVIRONMENT_CREATION_STARTED});
    try{
      const response = await axios.post(`${ROOT_URL}/environments`,values);
      dispatch({type: constants.ENVIRONMENT_CREATION_SUCCEEDED, payload : response.data});
    }catch(e){
      dispatch({type: constants.ENVIRONMENT_CREATION_FAILED, error : e});
    }
    
  }
}



export function fetchEnvironments() {
  return async dispatch => {
    try {
      const environments: Environment[] = (await axios.get(`${ROOT_URL}/environments`)).data;
      dispatch(receiveEnvironments(environments));

    } catch (error) {
      console.log(error);
      
    }
  }
}

export function receiveEnvironments(environments : Environment[]){
  return{
    type: constants.RECIEVE_ENVIRONMENTS,
    environments
  }
}



export function createScenario(values){
  console.log(values);
  
  return async dispatch => {
    dispatch({type: constants.SCENARIO_CREATION_STARTED});
    try{
      const response = await axios.post(`${ROOT_URL}/scenarios`,values);
      dispatch({type: constants.SCENARIO_CREATION_SUCCEEDED, payload : response.data});
    }catch(e){
      dispatch({type: constants.SCENARIO_CREATION_FAILED, error : e});
    }
    
  }
}



export function createSimulator(values){
  console.log(values);
  
  return async dispatch => {
    dispatch({type: constants.SIMULATOR_FILE_UPLOAD_STARTED});
    try{

      const formData = new FormData();
      formData.append("file",values.dockerfile);
      const response = await axios.post(`${ROOT_URL}/simulators/upload`, formData,
      {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      });
      dispatch({type: constants.SIMULATOR_FILE_UPLOAD_SUCCEEDED});
    }catch(e){
      dispatch({type: constants.SIMULATOR_FILE_UPLOAD_FAILED, error : e});
    }
    
  }
}