import { Environment, EnvironmentJSON } from "../../../../../simulations-manager/src/environments/Environment";

export const enum EnvironmentActionTypes {
    ENVIRONMENT_CREATION_STARTED = "ENVIRONMENT_CREATION_STARTED",
    ENVIRONMENT_CREATION_SUCCEEDED = "ENVIRONMENT_CREATION_SUCCEEDED",
    ENVIRONMENT_CREATION_FAILED = "ENVIRONMENT_CREATION_FAILED",
    RECIEVE_ENVIRONMENTS = "RECIEVE_ENVIRONMENTS",
    ENVIRONMENT_SELECTED = "ENVIRONMENT_SELECTED"
}

export interface EnvironmentsState{

    readonly all : EnvironmentJSON[];
    readonly selected : EnvironmentJSON | undefined;
}