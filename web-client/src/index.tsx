import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import SimulatorConfigurator from "./components/SimulatorConfigurator";
import "./index.css";
import rootReducer from "./reducers";
import ReduxThunk from "redux-thunk";




const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <SimulatorConfigurator />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
