import * as React from "react";
import { connect } from "react-redux";
import { fetchEnvironments } from "./store/actions";
import { List } from 'antd';
import { EnvironmentJSON } from "ditto-shared";
import EnvironmentCard from "./EnvironmentCard";
import { ApplicationState } from "../types";
import { AddNewButton } from "../shared/Buttons";

export interface Props {
    fetchEnvironments: () => any;
    environments: EnvironmentJSON[];
}
interface OwnState {
    environments: (EnvironmentJSON | {})[] | undefined;
}

class Environments extends React.Component<Props, OwnState>{
    constructor(props: Props) {
        super(props);
        this.state = { environments: undefined };
    }


    componentDidUpdate(prevProps) {
        if (this.props.environments !== prevProps.environments ||
            !this.state.environments && this.props.environments) {
            this.setState({ environments: [...this.props.environments] });
        }
    }

    componentDidMount() {
        this.props.fetchEnvironments();
    }
    render() {
        const { environments } = this.state;
        if (!environments) {
            return <div>Loading...</div>
        }
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