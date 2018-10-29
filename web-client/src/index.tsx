import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import "./index.css";
import "antd/dist/antd.css";
import rootReducer from "./reducers";
import ReduxThunk from "redux-thunk";
import EnvironmentForm from "./components/EnvironmentForm";
import nullUnregisredFields from "./middleware/nullUnregisredFields";
import clearNullValues from "./utils/form/clearNullValues";
import ScenarioForm from "./components/ScenarioForm";
import SimulatorUploadForm from "./components/SimulatorUploadForm";
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;



const store = createStore(rootReducer, applyMiddleware(ReduxThunk, nullUnregisredFields));

ReactDOM.render(
  <Provider store={store}>
    <div>

      <Layout>
        <Header>Header</Header>
        <Layout>
          <Sider>Sider</Sider>
          <Content>
            <EnvironmentForm />
          </Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>


      {/* <ScenarioForm /> */}
      {/* <SimulatorUploadForm /> */}

    </div>

  </Provider>,
  document.getElementById("root") as HTMLElement
);
