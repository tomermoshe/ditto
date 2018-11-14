import * as React from "react";
import { List, Card } from 'antd';
import { Environment } from "../../../simulations-manager/src/environments/Environment";
import { SimulatorInstanceId } from "../../../simulations-manager/src/simulators/simulatorInstanceId";
import ReactJson from 'react-json-view';
import EnvironmentForm from "./EnvironmentForm";
import { Switch } from 'antd';
import { selectEnvironment } from "../actions";
import { connect } from "react-redux";


export interface Props {
    environment: Environment;
}
interface DispatchProps {
    selectEnvironment: (Environment) => any;
}
interface StateProps {
    selectedEnvironment: Environment;
}
class EnvironmentCard extends React.Component<Props & DispatchProps & StateProps>{

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
            ({ attributes, cardContent } = this.createEnironmentCard(environment));
        }
        return (

            <Card {...attributes}>
                {cardContent}
            </Card>
        );
    }

    private createEnironmentCard(environment: Environment) {
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
                        <ReactJson name="configuration" src={simulator.configuration} />
                    </Card>
                </List.Item>)}
            />);
        return { attributes, cardContent };
    }

    private onSwitchEnvironment(environment: Environment): ((checked: boolean) => any) | undefined {
        return (checked) => {
            if (!checked) {
                this.props.selectEnvironment(null);
            }
            else {
                this.props.selectEnvironment(environment);
            }
        };
    }

    private isEmptyEnvironment(environment: Environment) {
        return Object.keys(environment).length === 0;
    }
}
const mapStateToProps = (state) => {
    return {
        selectedEnvironment: state.selectedEnvironment as Environment
    };
}
export default connect<StateProps, DispatchProps, Props>(mapStateToProps, { selectEnvironment })(EnvironmentCard);