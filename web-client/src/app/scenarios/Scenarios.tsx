import * as React from "react";
import { connect } from "react-redux"
import { ApplicationState } from "../types";
import { fetchScenarios } from "./store/actions";
import { Scenario } from "../../../../simulations-manager/src/scenarios/Scenario";
import { List } from "antd";
import Page from "../layouts/Page"
import styles from "./Scenarios.module.css";

interface DispatchProps {
    fetchScenarios: () => any;
}
interface StateProps {
    scenarios: Scenario[];
}

type Props = DispatchProps & StateProps;

class Scenarios extends React.Component<Props> {
    componentDidMount() {
        this.props.fetchScenarios();
    }

    render() {
        if (!this.props.scenarios) {
            return <div>Loading...</div>;
        }
        return (
            <Page styles={styles}>
                <List
                    dataSource={this.props.scenarios}
                    renderItem={(scenario: Scenario) =>
                        (<List.Item>{scenario.name}</List.Item>)}
                />

            </Page>

        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    scenarios: state.scenarios.all
})



export default connect(mapStateToProps, { fetchScenarios })(Scenarios);
