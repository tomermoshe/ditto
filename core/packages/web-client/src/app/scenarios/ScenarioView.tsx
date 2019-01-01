import * as React from "react";
import { Component } from "react";
import { ScenarioStep, ScenarioJSON, EnvironmentUtils, ScenarioStepStatus } from "ditto-shared";
import { Steps, Button, Spin } from "antd";
import { RouteComponentProps } from "react-router-dom";
import ReactJson from 'react-json-view';
import styled from "styled-components";
import { connect } from "react-redux";
import { ApplicationState } from "../types";
import { EnvironmentJSON } from "ditto-shared";
import * as socketIOClient from "socket.io-client";
import { SERVER_URL } from "../constants";
import ScenarioStepView from "./ScenarioStep";
import { fetchScenario } from "./store/actions";
import { selectEnvironment } from "../environments/store/actions";


const StyledH1 = styled.h1`
    display: inline-block;
    padding-right: 20px;
    margin: 0px;
    line-height : 1;
`;

interface StepProps {
    step: ScenarioStep;
}
const ScenarioStep = ({ step }: StepProps) => {
    return (
        <h2>{step.simulatorName}</h2>
    );
}




interface RouterProps {
    scenarioId: string;
}
interface OwnState {
    currentStep: number;
    executingEnvironment: boolean;
    executionStatus: string;
    stepStatuses: ScenarioStepStatus[];
}
interface StateProps {
    selectedEnvironment: EnvironmentJSON | undefined,
    selectedScenario: ScenarioJSON | undefined
}
interface DispatchProps {
    fetchScenario: (scenarioId: string) => any;
}

type Props = RouteComponentProps<RouterProps> & StateProps & DispatchProps;



class ScenarioView extends Component<Props, OwnState> {
    endpoint = `${SERVER_URL}:8000`;
    socket: SocketIOClient.Socket;

    constructor(props: Props) {
        super(props);
        this.socket = socketIOClient(this.endpoint);
        this.newStepsWithUpdatedStatus = this.newStepsWithUpdatedStatus.bind(this);
        this.subscribeEvents();

        this.state = {
            stepStatuses: [],
            currentStep: 0,
            executingEnvironment: false,
            executionStatus: ""

        }
    }

    initStepStatuses(){
        if(!this.props.selectedScenario){
            return;
        }
        const stepStatuses: ScenarioStepStatus[] = [...this.props.selectedScenario.steps];
        stepStatuses[0].status = "wait";
        this.setState({
            stepStatuses,
            currentStep: 0,
        });
    }
    componentDidUpdate(prevProps: Props){
        if(prevProps.selectedScenario !== this.props.selectedScenario){
            this.initStepStatuses();
        }
    }
    componentDidMount() {
        const { scenarioId } = this.props.match.params;
        this.props.fetchScenario(scenarioId);
    }
    componentWillUnmount() {
        this.socket.disconnect();
    }
    newStepsWithUpdatedStatus(currentStep: number, status, message?: string): ScenarioStepStatus[] {
        return [
            ...this.state.stepStatuses.slice(0, currentStep),
            {
                ...this.state.stepStatuses[currentStep],
                status,
                message
            },
            ...this.state.stepStatuses.slice(currentStep + 1)
        ];
    }
    subscribeEvents() {
        const fn = this.newStepsWithUpdatedStatus.bind(this);
        this.socket.on("STEP_STARTED", currentStep => {
            this.setState({
                currentStep,
                stepStatuses: fn(currentStep, "process")
            });
        });
        this.socket.on("STEP_FINISHED", currentStep => {
            this.setState({
                stepStatuses: fn(currentStep, "finish")
            });
        });
        this.socket.on("STEP_FAILED", (currentStep, error) => {
            this.setState({
                stepStatuses: fn(currentStep, "error", error.message)
            });
            console.log(error);

        });

        this.socket.on("ENVIRONMENT_EXECUTION_STARTED", () => {
            this.setState({ executingEnvironment: true });
        });
        this.socket.on("ENVIRONMENT_EXECUTION_FINISHED", () => {
            this.setState({ executingEnvironment: false });
        });
        this.socket.on("ENVIRONMENT_EXECUTION_STATUS", (msg) => {
            this.setState({ executionStatus: msg });
        });
    }

    playScenario(scenario: ScenarioJSON) {
        if (!this.props.selectedEnvironment) {
            return;
        }
        this.socket.emit("PLAY_TEST", {
            environmentId: this.props.selectedEnvironment._id,
            scenarioId: scenario._id
        });
    }
    render() {
        const Step = Steps.Step;

        if (!this.props.selectedScenario) {
            return <div>Loading...</div>
        }


        return (
            <Spin spinning={this.state.executingEnvironment} tip={this.state.executionStatus}>
                <div>
                    <div>
                        <StyledH1>
                            {this.props.selectedScenario.name}
                        </StyledH1>

                        <Button
                            icon="play-circle"
                            type="primary"
                            disabled={!EnvironmentUtils.canPlayScenario(this.props.selectedEnvironment, this.props.selectedScenario)}
                            onClick={() => this.playScenario(this.props.selectedScenario as ScenarioJSON)}
                        >
                            Play
                        </Button>
                    </div>

                    <Steps direction="vertical">
                        {this.state.stepStatuses.map((step, index) => {
                            return (

                                <Step
                                    key={index}
                                    status={step.status}
                                    description={<ScenarioStepView step={step} />}
                                    title={`${step.simulatorName} - ${step.command.name}`}
                                />
                            );

                        })}
                    </Steps>
                </div>
            </Spin>
        )
    }
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        selectedEnvironment: state.environments.selected,
        selectedScenario: state.scenarios.selected
    };
}





export default connect<StateProps, any, any>(mapStateToProps, { fetchScenario })(ScenarioView);
