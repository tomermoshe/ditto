import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import "./index.css";
import rootReducer from "./reducers";
import ReduxThunk from "redux-thunk";
import EnvironmentForm from "./components/EnvironmentForm";
import nullUnregisredFields from "./middleware/nullUnregisredFields";
import clearNullValues  from "./utils/form/clearNullValues";



const store = createStore(rootReducer, applyMiddleware(ReduxThunk, nullUnregisredFields));

ReactDOM.render(
  <Provider store={store}>
    <EnvironmentForm onSubmit={(values) => console.log(clearNullValues(values))} />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
