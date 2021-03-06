import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import "./index.css";
import "antd/dist/antd.css";
import ReduxThunk from "redux-thunk";
import nullUnregisredFields from "./middleware/nullUnregisredFields";
import { Router } from 'react-router-dom';
import App from "./app/App";
import { rootReducer } from "./app/types";
import { composeWithDevTools } from "redux-devtools-extension";
import LocalStorage from "./localStorage";
import history from "./app/shared/history";

const localStorage = new LocalStorage();

const store = createStore(rootReducer, localStorage.loadState(), composeWithDevTools(applyMiddleware(ReduxThunk, nullUnregisredFields)));
store.subscribe(() => {
  localStorage.saveNeededState(store.getState());
});
ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <App />
        </Router>
    </div>

  </Provider>,
      document.getElementById("root") as HTMLElement
    );
