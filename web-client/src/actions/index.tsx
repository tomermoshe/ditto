import * as constants from "../constants";
import axios, { AxiosResponse } from "axios";
import { SimulatorId } from "../../../simulations-manager/src/simulators/simulatorId";
import { SimulatorConfig } from "../../../simulations-manager/src/simulators/simulatorConfig";


const ROOT_URL = "http://172.17.0.1/api";

export type SimulatorsAction = ReturnType<typeof receiveSimulators>;






export function fetchSimulators() {
  return async dispatch => {
    try {
      const simulators: SimulatorConfig[] = (await axios.get(`${ROOT_URL}/simulators`)).data;
      dispatch(receiveSimulators(simulators));

    } catch (error) {
      console.log(error);
      
    }
  }

}

export function receiveSimulators(simulators : SimulatorConfig[]){
  return{
    type: constants.RECIEVE_SIMULATORS,
    simulators
  }
}

