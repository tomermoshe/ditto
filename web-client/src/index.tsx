import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import "./index.css";
import "antd/dist/antd.css";
import rootReducer from "./reducers";
import ReduxThunk from "redux-thunk";
import nullUnregisredFields from "./middleware/nullUnregisredFields";
<<<<<<< HEAD
=======
import clearNullValues from "./utils/form/clearNullValues";
import ScenarioForm from "./components/ScenarioForm";
>>>>>>> 0d6f5bd24b7216e193bc1678e35c41ffc0f39c4a
import SimulatorUploadForm from "./components/SimulatorUploadForm";
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;



const store = createStore(rootReducer, applyMiddleware(ReduxThunk, nullUnregisredFields));

ReactDOM.render(
  <Provider store={store}>
<<<<<<< HEAD
    {/* <EnvironmentForm  /> */}
    {/* <ScenarioForm /> */}
    <SimulatorUploadForm />
=======
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

>>>>>>> 0d6f5bd24b7216e193bc1678e35c41ffc0f39c4a
  </Provider>,
  document.getElementById("root") as HTMLElement
);
