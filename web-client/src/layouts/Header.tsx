import * as React from "react";
import { Menu, Icon, Layout } from 'antd';

const Header = () => {


    return (

        <Layout.Header className="header">
            <Menu mode="horizontal" selectable={false}>
                <Menu.Item key="mail">
                    <Icon type="mail" theme="outlined" />
                </Menu.Item>
                <Menu.Item key="user">
                    <Icon type="user" theme="outlined" />
                    <span> guest</span>
                </Menu.Item>
            </Menu>
        </Layout.Header>

    );
}

export default Header;