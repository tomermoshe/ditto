import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ScenarioCreator from "./components/ScenarioCreator";
import "./index.css";
import rootReducer from "./reducers";
import promise = require("redux-promise");

console.log(promise);

const store = createStore(rootReducer, applyMiddleware(promise.default));

ReactDOM.render(
  <Provider store={store}>
    <ScenarioCreator />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
