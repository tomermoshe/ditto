import * as constants from "../constants";
import axios, { AxiosPromise, AxiosResponse } from "axios";

// export interface IncrementEnthusiasm {
//   type: constants.INCREMENT_ENTHUSIASM;
// }

// export interface DecrementEnthusiasm {
//   type: constants.DECREMENT_ENTHUSIASM;
// }

// export type EnthusiasmAction = IncrementEnthusiasm | DecrementEnthusiasm;

// export function incrementEnthusiasm(): IncrementEnthusiasm {
//   return {
//     type: constants.INCREMENT_ENTHUSIASM
//   };
// }

// export function decrementEnthusiasm(): DecrementEnthusiasm {
//   return {
//     type: constants.DECREMENT_ENTHUSIASM
//   };
// }


//////////////////////////////////////////////////

const ROOT_URL = "http://127.0.0.1:80/api"

export type SimulatorsAction = FetchSimulatorNames;


export interface FetchSimulatorNames {
  type: constants.FETCH_SIMULATOR_NAMES;
  payload: AxiosResponse<string[]>;
}

export function fetchSimulatorNames() {
  const request = axios.get(`${ROOT_URL}/simulators/names`);
  return {
    type: constants.FETCH_SIMULATOR_NAMES,
    payload: request
  }
}