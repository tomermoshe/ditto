import * as React from "react";
import { Component } from "react";
import { ScenarioStep, ScenarioJSON, EnvironmentUtils } from "ditto-shared";
import { Steps, Button, Spin , message } from "antd";
import { RouteComponentProps } from "react-router-dom";
import ReactJson from 'react-json-view';
import styled from "styled-components";
import { connect } from "react-redux";
import { ApplicationState } from "../types";
import { EnvironmentJSON } from "ditto-shared";
import * as socketIOClient from "socket.io-client";
import { SERVER_URL } from "../constants";


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

interface ScenarioProps {
    findScenarioById: (id: string) => ScenarioJSON;
}



interface RouterProps {
    scenarioId: string;
}
interface OwnState {
    currentStep: number;
    currentStepStatus: "error" | "finish" | "wait" | "process" | undefined;
    executingEnvironment: boolean;
    executionStatus : string;
}
interface DispatchProps {
    selectedEnvironment: EnvironmentJSON | undefined
}

type Props = ScenarioProps & RouteComponentProps<RouterProps> & DispatchProps;



class ScenarioView extends Component<Props, OwnState> {
    endpoint = `${SERVER_URL}:8000`;
    socket: SocketIOClient.Socket;

    constructor(props: Props) {
        super(props);
        this.socket = socketIOClient(this.endpoint);

        this.state = {
            currentStep: 0,
            currentStepStatus: "wait",
            executingEnvironment: false,
            executionStatus: ""

        }
    }

    subscribeEvents(){
        this.socket.on("STEP_STARTED", currentStep => {
            this.setState({ 
                currentStep ,
                currentStepStatus : "process"
            });
        });
        this.socket.on("STEP_FINISHED", currentStep => {
            this.setState({ 
                currentStepStatus : "finish"
            });
        });
        this.socket.on("ENVIRONMENT_EXECUTION_STARTED", () => {
            this.setState({ executingEnvironment: true });
        });
        this.socket.on("ENVIRONMENT_EXECUTION_FINISHED", () => {
            this.setState({ executingEnvironment: false });
        });
        this.socket.on("ENVIRONMENT_EXECUTION_STATUS", (msg) => {
            this.setState({ executionStatus : msg });
        });
    }
    componentDidMount() {
        this.setState({
            currentStep: 0
        });
       this.subscribeEvents();
    }
    playScenario(scenario: ScenarioJSON) {
        if (!this.props.selectedEnvironment) {
            message.error("Please select environment!");
            return;
        }
        this.socket.emit("PLAY_TEST", {
            environmentId: this.props.selectedEnvironment._id,
            scenarioId: scenario._id
        });
    }
    render() {
        const Step = Steps.Step;
        const { scenarioId } = this.props.match.params;
        const scenario: ScenarioJSON = this.props.findScenarioById(scenarioId);
        if(!scenario){
            return <div>Loading...</div>
        }
        return (
            <Spin spinning={this.state.executingEnvironment} tip={this.state.executionStatus}>
                <div>
                    <div>
                        <StyledH1>
                            {scenario.name}
                        </StyledH1>

                        <Button
                            icon="play-circle"
                            type="primary"
                            disabled={!EnvironmentUtils.canPlayScenario(this.props.selectedEnvironment,scenario)}
                            onClick={() => this.playScenario(scenario)}
                        >
                            Play
                        </Button>
                    </div>

                    <Steps direction="vertical" current={this.state.currentStep} status={this.state.currentStepStatus}>
                        {scenario.steps.map((step, index) => {
                            const description = <ReactJson name="command.body" src={step.command.body} />

                            return (
                                <Step key={index} description={description} title={`${step.simulatorName} - ${step.command.name}`} />
                            );

                        })}
                    </Steps>
                </div>
            </Spin>
        )
    }
}

const mapDispatchToProps = (state: ApplicationState) => {
    return {
        selectedEnvironment: state.environments.selected
    };
}

export default connect<DispatchProps, any, ScenarioProps>(mapDispatchToProps, null)(ScenarioView);
