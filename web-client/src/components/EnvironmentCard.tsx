import * as React from "react";
import { List, Card } from 'antd';
import { Environment } from "../../../simulations-manager/src/environments/Environment";
import { SimulatorInstanceId } from "../../../simulations-manager/src/simulators/simulatorInstanceId";
import ReactJson from 'react-json-view';
import EnvironmentForm from "./EnvironmentForm";

export interface Props {
    environment: Environment;
}

export default class EnvironmentCard extends React.Component<Props>{


    render() {
        const { environment } = this.props;
        let attributes = {};
        let cardContent = {};
        if (Object.keys(environment).length === 0) {
            cardContent = <EnvironmentForm />
        }
        else {
            attributes = { title: environment.name };
            cardContent = (
                <List
                    grid={{ gutter: 16, column: 1 }}
                    dataSource={environment.simulators}
                    renderItem={(simulator: SimulatorInstanceId) => (
                        <List.Item>
                            <Card
                                title={`${simulator.name} ${simulator.id.imageName}:${simulator.id.version}`}
                            >
                                <ReactJson name="configuration" src={simulator.configuration} />
                            </Card>
                        </List.Item>
                    )}
                />);
        }
        return (

            <Card {...attributes}>
                {cardContent}
            </Card>
        );
    }
}

