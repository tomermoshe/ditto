import * as React from "react";
import ReactJson from "react-json-view";
import { ScenarioStep } from "ditto-shared";
import styled from "styled-components";
import { Alert, Row, Col, Steps } from "antd";
import { ScenarioStepStatus } from "ditto-shared";

const InlineAlert = styled(Alert)`
    display: inline-block;
`;


interface Props {
    step: ScenarioStepStatus
}

function ScenarioStepView(props: Props) {
    const { step } = props;
    return (
        <div>
            <ReactJson name="command.body" collapsed={true} src={step.command.body} />
            {step.message && <InlineAlert showIcon={true} message={step.message} type="error" />}
        </div>
    );
}


export default ScenarioStepView;

