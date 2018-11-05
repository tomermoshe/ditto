import * as React from "react";
import { Layout } from 'antd';
import "./App.css"
import { Switch, Route} from 'react-router-dom'

import EnvironmentForm from "../components/EnvironmentForm";
import SimulatorUploadForm from "../components/SimulatorUploadForm";
import ScenarioForm from "../components/ScenarioForm";
import Sider from "./Sider"; 
import Header from "./Header";
import Environments from "../components/Environments";


const App = () => {
    return (
    <div>
        <title>Ditto</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Layout style={{ height: '100vh', overflow: 'scroll' }} id="mainContainer">
            <Sider />
            <Layout>
                <Header />
                <Layout.Content className="content">
                    <Switch>
                        <Route exact={true} path='/environments' component={Environments} />
                        <Route exact={true} path='/scenarios' component={ScenarioForm} />
                        <Route exact={true} path='/simulators' component={SimulatorUploadForm} />
                    </Switch>
                </Layout.Content>

            </Layout>
        </Layout>
    </div>);
}

export default App;