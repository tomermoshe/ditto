import * as constants from "../constants";
import axios, { AxiosPromise, AxiosResponse } from "axios";
import { SimulatorId } from "../../../simulations-manager/src/simulators/SimulatorId";


const ROOT_URL = "https://7a240434-c481-4e9b-bf97-c0abdf97f817.mock.pstmn.io/api";
export type SimulatorsAction = FetchSimulators;


export interface FetchSimulators {
  type: constants.FETCH_SIMULATOR_NAMES;
  payload: AxiosResponse<SimulatorId[]>;
}

export function fetchSimulators() {
  const request = axios.get(`${ROOT_URL}/simulators`);
  return {
    type: constants.FETCH_SIMULATORS,
    payload: request
  }
}