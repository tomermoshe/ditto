import {ROOT_URL} from "../../constants";
import { SimulatorDefinition } from "../../../../../simulations-manager/src/simulators/simulatorDefinition";
import axios from "axios";
import { SimulatorActionTypes } from "./types";

const  ROOT_URL_SIMULATORS = `${ROOT_URL}/simulators`;


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
  


export function createSimulator(values) {
    console.log(values);
  
    return async dispatch => {
      dispatch({ type: SimulatorActionTypes.SIMULATOR_FILE_UPLOAD_STARTED });
      try {
  
        const formData = new FormData();
        formData.append("file", values.dockerfile);
        await axios.post(`${ROOT_URL}/simulators/upload`, formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        dispatch({ type: SimulatorActionTypes.SIMULATOR_FILE_UPLOAD_SUCCEEDED });
  
        try {
          dispatch({ type: SimulatorActionTypes.SIMULATOR_CREATION_STARTED });
          delete values.dockerfile;
          await axios.post(ROOT_URL_SIMULATORS, values);
          dispatch({ type: SimulatorActionTypes.SIMULATOR_CREATION_SUCCEEDED });
  
        } catch (error) {
          dispatch({ type: SimulatorActionTypes.SIMULATOR_CREATION_FAILED });
  
        }
      } catch (e) {
        // TODO: check why i don't get an error message here.
        dispatch({ type: SimulatorActionTypes.SIMULATOR_FILE_UPLOAD_FAILED, error: e });
      }
  
    }
  }