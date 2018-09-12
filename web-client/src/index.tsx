import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import "./index.css";
import rootReducer from "./reducers";
import ReduxThunk from "redux-thunk";
import EnvironmentForm from "./components/EnvironmentForm";
import { change, actionTypes } from 'redux-form';

const removeUnregisred=  ({ dispatch }) => next => action => {
    if (action.type === actionTypes.UNREGISTER_FIELD) {
        dispatch(change(action.meta.form, action.payload.name, null));
    }
    next(action);
};



const store = createStore(rootReducer, applyMiddleware(ReduxThunk,removeUnregisred));

ReactDOM.render(
  <Provider store={store}>
    <EnvironmentForm onSubmit={(values) => console.log(values)} />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
