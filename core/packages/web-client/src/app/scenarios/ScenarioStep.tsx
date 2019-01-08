import * as React from "react";
import ReactJson from "react-json-view";
import { ScenarioStep } from "ditto-shared";
import styled from "styled-components";
import { Alert, Row, Col, Steps } from "antd";
import { ScenarioStepStatus } from "ditto-shared";

const FlexDiv = styled.div`
    display : flex;
    align-items : center;
`;


interface Props {
    step: ScenarioStepStatus
}

function ScenarioStepView(props: Props) {
    const { step } = props;
    return (
        <Row align="middle">
            <Col span={8}>
                <ReactJson name="command.body" collapsed={true} src={step.command.body} />
            </Col>
            <Col span={8}>
                {step.message && <Alert message={step.message} type="error" />}
            </Col>
        </Row>
    );
}


export default ScenarioStepView;

