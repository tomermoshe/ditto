import * as React from "react";
import { Menu, Icon, Layout } from 'antd';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import ScenariosSvg from "../../icons/ScenariosSvg";
const logo = require("./logo.svg") as string;
import SiteLogo from "./SiteLogo";


const getPageName = (path: string): string[] => {
    let tmp = path.slice(1);
    tmp = tmp.split("/")[0];
    if (!tmp || tmp.length === 0) {
        return ['scenarios'];
    } else {
        return [tmp];
    }
}


const Sider = (props: RouteComponentProps) => {

    return (

        <Layout.Sider width={200} className="sider">
            <SiteLogo />
            <Menu
                mode="inline"
                defaultSelectedKeys={['scenarios']}
                defaultOpenKeys={['scenarios']}
                selectedKeys={getPageName(props.location.pathname)}
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
export default withRouter(Sider);
