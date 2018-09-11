import * as constants from "../constants";
import axios, { AxiosResponse } from "axios";
import { SimulatorDefinition } from "../../../simulations-manager/src/simulators/simulatorDefinition";


const ROOT_URL = "https://7a240434-c481-4e9b-bf97-c0abdf97f817.mock.pstmn.io/api";

export type SimulatorsAction = ReturnType<typeof receiveSimulators>;






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

