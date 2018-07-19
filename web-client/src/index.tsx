import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore ,applyMiddleware } from "redux";
import ScenarioCreator from "./components/ScenarioCreator";
import "./index.css";
import reducers from "./reducers";
import promise =  require("redux-promise");


const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <ScenarioCreator />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
