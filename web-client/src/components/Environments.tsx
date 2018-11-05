import * as React from "react";
import { connect } from "react-redux";
import { fetchEnvironments } from "../actions";
import { List, Card, Button } from 'antd';
import { Environment } from "../../../simulations-manager/src/environments/Environment";
import EnvironmentCard from "./EnvironmentCard";
import EnvironmentForm from "./EnvironmentForm";

export interface Props {
    fetchEnvironments: () => any;
    environments: [Environment | {}];
}

class Environments extends React.Component<Props>{
    componentDidMount() {
        this.props.fetchEnvironments();
    }
    render() {
        const { environments } = this.props;

        return (
            <div>

                <List
                    grid={{ gutter: 16, column: 2 }}
                    dataSource={environments}
                    renderItem={environment => (
                        <List.Item>
                            <EnvironmentCard environment={environment} />
                        </List.Item>
                    )
                    }
                />
                <Button
                    className="add-button"
                    type="primary"
                    icon="plus"
                    size="large"
                    onClick={() => this.setState(
                        {
                            environments: environments.push({})
                        }
                    )}
                >
                    Add Environment
                </Button>
            </div>


        );
    }
}


function mapStateToProps(state) {
    return {
        environments: state.environments
    }
}

export default connect(mapStateToProps, { fetchEnvironments })(Environments);