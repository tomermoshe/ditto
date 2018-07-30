import * as constants from "../constants";
import axios, { AxiosResponse } from "axios";
import { SimulatorId } from "../../../simulations-manager/src/simulators/simulatorId";
import { SimulatorConfig } from "../../../simulations-manager/src/simulators/simulatorConfig";


const ROOT_URL = "https://7a240434-c481-4e9b-bf97-c0abdf97f817.mock.pstmn.io/api";

export type SimulatorsAction = ReturnType<typeof receiveSimulators>;






export function fetchSimulators() {
  return async dispatch => {
    const simulators: SimulatorConfig[] = (await axios.get(`${ROOT_URL}/simulators`)).data;
    dispatch(receiveSimulators(simulators));
  }

}

export function receiveSimulators(simulators : SimulatorConfig[]){
  return{
    type: constants.RECIEVE_SIMULATORS,
    simulators
  }
}

