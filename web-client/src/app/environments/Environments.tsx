import * as React from "react";
import { connect } from "react-redux";
import { fetchEnvironments } from "./store/actions";
import { List, Button } from 'antd';
import { EnvironmentJSON } from "../../../../simulations-manager/src/environments/Environment";
import EnvironmentCard from "./EnvironmentCard";
import { ApplicationState } from "../types";
import AddNewButton from "../shared/AddNewButton";

export interface Props {
    fetchEnvironments: () => any;
    environments: EnvironmentJSON[];
}
interface OwnState {
    environments: (EnvironmentJSON | {})[];
}

class Environments extends React.Component<Props, OwnState>{
    constructor(props: Props) {
        super(props);
        this.state = { environments: [] };
    }


    componentDidUpdate(prevProps) {
        if (this.props.environments !== prevProps.environments) {
            this.setState({ environments: [...this.props.environments] });
        }
    }

    componentDidMount() {
        this.props.fetchEnvironments();
    }
    render() {
        const { environments } = this.state;

        return (
            <div>

                <List
                    grid={{ gutter: 16, column: 2 }}
                    dataSource={this.state.environments}
                    renderItem={environment => (
                        <List.Item>
                            <EnvironmentCard environment={environment} />
                        </List.Item>
                    )
                    }
                />
                <AddNewButton
                    onClick={() => this.setState(
                        {
                            environments: [...environments, {}]
                        }
                    )}
                >
                    Add Environment
                </AddNewButton>
                {/* <Button
                    className="add-button"
                    type="primary"
                    icon="plus"
                    size="large"
                    onClick={() => this.setState(
                        {
                            environments: [...environments, {}]
                        }
                    )}
                >
                    Add Environment
                </Button> */}
            </div>


        );
    }
}


function mapStateToProps(state: ApplicationState) {
    return {
        environments: state.environments.all
    }
}

export default connect(mapStateToProps, { fetchEnvironments })(Environments);