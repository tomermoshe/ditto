import * as React from "react";
import { Layout } from 'antd';
import "./App.css"
import { Switch, Route} from 'react-router-dom'

import SimulatorUploadForm from "./simulators/SimulatorUploadForm";
import ScenarioForm from "./scenarios/ScenarioForm";
import Sider from "./layouts/Sider"; 
import Header from "./layouts/Header";
import Environments from "./environments/Environments";
import Scenarios  from "./scenarios/Scenarios";
import StyledContent from "./layouts/StyledContent";


const App = () => {
    return (
    <div>
        <title>Ditto</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Layout style={{ height: '100vh', overflow: 'scroll' }} id="mainContainer">
            <Sider />
            <Layout>
                <Header />
                <StyledContent>
                    <Switch>
                        <Route exact={true} path='/environments' component={Environments} />
                        <Route path='/scenarios' component={Scenarios} />
                        <Route exact={true} path='/simulators' component={SimulatorUploadForm} />
                        
                    </Switch>
                </StyledContent>

            </Layout>
        </Layout>
    </div>);
}

export default App;