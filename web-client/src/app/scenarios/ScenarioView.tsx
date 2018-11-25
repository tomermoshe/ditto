import * as React from "react";
import { Scenario, ScenarioStep, ScenarioJSON } from "../../../../simulations-manager/src/scenarios/Scenario";
import { Steps, Button } from "antd";
import { RouteComponentProps } from "react-router-dom";
import ReactJson from 'react-json-view';
import styled from "styled-components";
import { connect } from "react-redux";
import { playScenario } from "./store/actions";

const StyledH1 = styled.h1`
    display: inline-block;
    padding-right: 20px;
    margin: 0px;
`;

interface StepProps {
    step: ScenarioStep;
}
const ScenarioStep = ({ step }: StepProps) => {
    return (
        <h2>{step.simulatorName}</h2>
    );
}

interface ScenarioProps {
    findScenarioById: (id: string) => ScenarioJSON;
}

interface DispatchProps {
    playScenario: (scenario: ScenarioJSON) => any;
}

interface RouterProps {
    scenarioId: string;
}

type Props = ScenarioProps & RouteComponentProps<RouterProps> & DispatchProps;
const ScenarioView = (props: Props) => {
    const Step = Steps.Step;
    const { scenarioId } = props.match.params;
    const scenario: ScenarioJSON = props.findScenarioById(scenarioId);
    return (
        <div>
            <div>
                <StyledH1>
                    {scenario.name}
                </StyledH1>

                <Button
                    icon="play-circle"
                    type="primary"
                    onClick={() => props.playScenario(scenario)}
                >
                    Play
                </Button>
            </div>

            <Steps direction="vertical" current={0}>
                {scenario.steps.map((step, index) => {
                    const description = <ReactJson name="command.body" src={step.command.body} />

                    return (
                        <Step key={index} description={description} title={`${step.simulatorName} - ${step.command.name}`} />
                    );

                })}
            </Steps>
        </div>
    )
}

export default connect(null, { playScenario })(ScenarioView);


