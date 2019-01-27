import * as React from "react";
import { List, Card, Button, Row, Col } from 'antd';
import { EnvironmentJSON } from "ditto-shared";
import { SimulatorInstanceId } from "ditto-shared";
import ReactJson from 'react-json-view';
import CreateEnvironmentForm from "./CreateEnvironmentForm";
import { selectEnvironment, deleteEnvironment } from "./store/actions";
import { connect } from "react-redux";
import { ApplicationState } from "../types";
import EditEnvironmentForm from "./EditEnvironmentForm";
import { EnvironmentCardTitle } from "./EnvironmentCardTitle";



export interface OwnProps {
    environment: EnvironmentJSON;
}
interface DispatchProps {
    selectEnvironment: (environment: EnvironmentJSON | undefined) => any;
    deleteEnvironment: (id: string) => any;
}
interface StateProps {
    selectedEnvironment: EnvironmentJSON | undefined;
}
interface OwnState {
    isEditing: boolean;
}

type AllProps = OwnProps & DispatchProps & StateProps;

class EnvironmentCard extends React.Component<AllProps, OwnState>{

    constructor(props) {
        super(props);
        this.state = { isEditing: false };
        this.setEditing = this.setEditing.bind(this);
        this.onSwitchEnvironment = this.onSwitchEnvironment.bind(this);
    }

    createTitle(simulator) {
        return (
            <div>
                {simulator.name}  <code className="image-description">{`${simulator.id.imageName}:${simulator.id.version}`}</code>
            </div>
        );
    }

    render() {
        const { environment } = this.props;
        let attributes = {};
        let cardContent = {};
        if (this.state.isEditing) {
            cardContent = <EditEnvironmentForm environment={environment} onCancel={() => this.setEditing(false)} />;
        } else if (this.isEmptyEnvironment(environment)) {
            cardContent = <CreateEnvironmentForm />
        }
        else {
            ({ attributes, cardContent } = this.createEnvironmentCard(environment));
        }
        return (

            <Card style={{ height: "400px", overflow: "auto" }} {...attributes}>
                {cardContent}
            </Card>
        );
    }
    setEditing(bool) {
        this.setState({ isEditing: bool });
    }
    componentDidUpdate(prevProps: AllProps) {
        if (prevProps.environment !== this.props.environment) {
            this.setState({ isEditing: false })
        }
    }

    private createEnvironmentCard(environment: EnvironmentJSON) {

        const cardTitle =
            (
                <EnvironmentCardTitle
                    environment={this.props.environment}
                    onEdit={() => { this.setEditing(true) }}
                    onDelete={this.props.deleteEnvironment}
                    onSwitchEnvironment={this.onSwitchEnvironment}
                    selected={this.props.selectedEnvironment && this.props.selectedEnvironment.name === this.props.environment.name}

                />
            );


        const attributes = { title: cardTitle };
        const cardContent = (
            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={environment.simulators}
                renderItem={(simulator: SimulatorInstanceId) => (<List.Item>
                    <Card title={this.createTitle(simulator)}>
                        {simulator.configuration &&
                            <ReactJson collapsed={true} name="configuration" src={simulator.configuration} />
                        }
                    </Card>
                </List.Item>)}
            />);
        return { attributes, cardContent };
    }

    private onSwitchEnvironment(environment: EnvironmentJSON): ((checked: boolean) => any) | undefined {
        return (checked) => {
            if (!checked) {
                this.props.selectEnvironment(undefined);
            }
            else {
                this.props.selectEnvironment(environment);
            }
        };
    }

    private isEmptyEnvironment(environment: EnvironmentJSON) {
        return Object.keys(environment).length === 0;
    }
}
const mapStateToProps = (state: ApplicationState) => {
    return {
        selectedEnvironment: state.environments.selected
    };
}
export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, { selectEnvironment, deleteEnvironment })(EnvironmentCard);