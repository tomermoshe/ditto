import styled from "styled-components";
import { Button } from "antd";
import * as React from "react";
const ButtomRightCornerButton = styled(Button)`
    position: fixed;
    bottom: 40px;
    right: 40px;
    z-index: 150;
`;

export const MenuButton = styled(Button)`
    margin-right : 8px;
`;


export const AddNewButton = props => {
    return (
        <ButtomRightCornerButton
            type="primary"
            icon="plus"
            size="large"
            {...props}
        >
            {props.children}
        </ButtomRightCornerButton>
    );
}


