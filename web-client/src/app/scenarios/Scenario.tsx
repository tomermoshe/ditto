import * as React from "react";
import { Scenario, ScenarioStep, ScenarioJSON } from "../../../../simulations-manager/src/scenarios/Scenario";
import { Steps } from "antd";
import { RouteComponentProps } from "react-router-dom";

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

interface RouterProps {
    scenarioId: string;
}
const Scenario = (props: ScenarioProps & RouteComponentProps<RouterProps>) => {
    const Step = Steps.Step;
    const { scenarioId } = props.match.params;
    const scenario: ScenarioJSON = props.findScenarioById(scenarioId);
    return (
        <div>
            <h1>
                {scenario.name}
            </h1>

            <Steps direction="vertical" current={0}>
                {scenario.steps.map((step,index) => (
                    <Step key={index} title={`${step.simulatorName} - ${step.command.name}`} />
                ))}
            </Steps>
        </div>
    )
}



export default Scenario
