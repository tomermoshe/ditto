import { SimulatorDefinition } from "ditto-shared";

export const enum SimulatorActionTypes {
  FETCH_SIMULATORS = "FETCH_SIMULATORS",
  RECIEVE_SIMULATORS = "RECIEVE_SIMUALTORS",
  SIMULATOR_FILE_UPLOAD_STARTED = "SIMULATOR_FILE_UPLOAD_STARTED",
  SIMULATOR_FILE_UPLOAD_SUCCEEDED = "SIMULATOR_FILE_UPLOAD_SUCCEEDED",
  SIMULATOR_FILE_UPLOAD_FAILED = "SIMULATOR_FILE_UPLOAD_FAILED",
  SIMULATOR_CREATION_SUCCEEDED = "SIMULATOR_CREATION_SUCCEEDED",
  SIMULATOR_CREATION_FAILED = "SIMULATOR_CREATION_FAILED",
  SIMULATOR_CREATION_STARTED = "SIMULATOR_CREATION_STARTED",
  CLEAR_CREATION_STATUS = "CLEAR_CREATION_STATUS"
}

export interface CreationStatus {
    status : "succeded" | "failed";
    message? : string;
}

export interface SimulatorsState {
    readonly all: SimulatorDefinition[];
    readonly creationStatus : CreationStatus | undefined;
}
