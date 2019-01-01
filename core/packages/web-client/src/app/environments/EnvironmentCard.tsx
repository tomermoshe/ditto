import * as React from "react";
import { List, Card } from 'antd';
import { EnvironmentJSON } from "ditto-shared";
import { SimulatorInstanceId } from "ditto-shared";
import ReactJson from 'react-json-view';
import EnvironmentForm from "./EnvironmentForm";
import { Switch } from 'antd';
import { selectEnvironment } from "./store/actions";
import { connect } from "react-redux";
import { ApplicationState } from "../types";


export interface OwnProps {
    environment: EnvironmentJSON;
}
interface DispatchProps {
    selectEnvironment: (environment: EnvironmentJSON | undefined) => any;
}
interface StateProps {
    selectedEnvironment: EnvironmentJSON | undefined;
}

type AllProps = OwnProps & DispatchProps & StateProps;

class EnvironmentCard extends React.Component<AllProps>{

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
        if (this.isEmptyEnvironment(environment)) {
            cardContent = <EnvironmentForm />
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

    private createEnvironmentCard(environment: EnvironmentJSON) {
        const cardTitle = (
            <div className="environment-title">
                {environment.name}
                <Switch
                    size="small"
                    onChange={this.onSwitchEnvironment(environment)}
                    checked={this.props.selectedEnvironment && this.props.selectedEnvironment.name === this.props.environment.name}
                />
            </div>
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
export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, { selectEnvironment })(EnvironmentCard);