import * as React from "react";
import { Menu, Icon, Layout } from 'antd';
import styled from "styled-components";
import { connect } from "react-redux";
import { ApplicationState } from "../types";
import { Environment } from "ditto-shared";

const StyledHeader = styled(Layout.Header)`
position: relative;
display: flex;
justify-content: flex-end;
height: 56px;
z-index: 9;
align-items: center;
background-color: #fff;
padding-right: 16px;

.ant-menu-horizontal {
    line-height: 56px;
    border: none;
}
.ant-menu-item:hover {
    color: #1890ff;
    background-color: rgba(24, 144, 255, 0.15);
}

.ant-menu-horizontal > .ant-menu-item,
.ant-menu-horizontal > .ant-menu-submenu {
      border-bottom: none;
    }
.ant-menu-item .anticon {
    margin: auto;
}`;

interface StateProps {
    selectedEnvironment : Environment | undefined;
}

const Header = ({selectedEnvironment} : StateProps) => {
    return (

        <StyledHeader>
            <Menu mode="horizontal" selectable={false}>
                <Menu.Item key="environment">
                    <Icon type="global" theme="outlined" />
                    <span> {selectedEnvironment === undefined ? `<Select Environment>` : selectedEnvironment.name}</span>
                </Menu.Item>
                <Menu.Item key="mail">
                    <Icon type="mail" theme="outlined" />
                </Menu.Item>
                <Menu.Item key="user">
                    <Icon type="user" theme="outlined" />
                    <span> guest</span>
                </Menu.Item>
            </Menu>
        </StyledHeader>

    );
}

function mapStateToProps(state: ApplicationState) {
    return {
        selectedEnvironment: state.environments.selected
    }
}

export default connect(mapStateToProps)(Header);
