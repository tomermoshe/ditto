import * as React from "react";
import { Menu, Icon ,Layout} from 'antd';
import { Link} from 'react-router-dom'
import ScenariosSvg from "../icons/ScenariosSvg";
const logo = require("./logo.svg") as string;


const Sider = () => { return (

    <Layout.Sider width={200} className="sider">
        <div className="logo">
            <img src={logo} />
            <span>Ditto</span>
        </div>
        <Menu
            mode="inline"
            defaultSelectedKeys={['environments']}
            defaultOpenKeys={['environments']}
        >
            <Menu.Item key="environments"> 

                <Link to="/environments">
                    <Icon type="global" theme="outlined" />

                    <span>Environments</span>

                </Link> 

            </Menu.Item>
            <Menu.Item key="scenarios">
                <Link to="/scenarios">

                    <Icon component={ScenariosSvg} />

                    <span>Scenarios</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="simulators">
                <Link to="/simulators">

                    <Icon type="file-protect" />
                    <span>Simulators</span>
                </Link>
            </Menu.Item>
        </Menu>
    </Layout.Sider>

)
};

export default Sider;