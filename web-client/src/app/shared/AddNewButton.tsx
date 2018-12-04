import styled from "styled-components";
import { Button } from "antd";
import * as React from "react";
const ButtomRightCornerButton = styled(Button)`
    position: fixed;
    bottom: 40px;
    right: 40px;
    z-index: 150;
`;


const AddNewButton = props => {
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


export default AddNewButton;
