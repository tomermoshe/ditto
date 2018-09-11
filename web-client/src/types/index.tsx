import { StateType } from "typesafe-actions";
import rootReducer from "../reducers"



export type RootState = StateType<typeof rootReducer>;
