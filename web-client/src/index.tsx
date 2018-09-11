import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import "./index.css";
import rootReducer from "./reducers";
import ReduxThunk from "redux-thunk";
import EnvironmentForm from "./components/EnvironmentForm";




const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <EnvironmentForm onSubmit={(values) => console.log(values)} />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
