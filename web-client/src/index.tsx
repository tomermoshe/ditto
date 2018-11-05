import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import "./index.css";
import "antd/dist/antd.css";
import rootReducer from "./reducers";
import ReduxThunk from "redux-thunk";
import nullUnregisredFields from "./middleware/nullUnregisredFields";
import { BrowserRouter } from 'react-router-dom';
import App from "./layouts/App";



const store = createStore(rootReducer, applyMiddleware(ReduxThunk, nullUnregisredFields));

ReactDOM.render(
  <Provider store={store}>
    <div>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </div>

  </Provider>,
  document.getElementById("root") as HTMLElement
);
