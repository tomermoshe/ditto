import { StateType } from "typesafe-actions";
import rootReducer from "../reducers/index"



export type RootState = StateType<typeof rootReducer>;
