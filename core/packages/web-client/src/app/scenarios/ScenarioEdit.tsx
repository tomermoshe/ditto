import * as React from "react";
import { connect } from 'react-redux';
import { updateScenario, fetchScenario } from "./store/actions";
import ScenarioForm from "./ScenarioForm";
import clearNullValues from "../../utils/form/clearNullValues";
import { RouteComponentProps } from "react-router";
import { ScenarioJSON } from "ditto-shared";
import { ApplicationState } from "../types";



interface RouterProps {
    scenarioId: string;
}

interface StateProps {
    selectedScenario: ScenarioJSON | undefined;
}


interface DispatchProps {
    fetchScenario: (scenarioId: string) => any;
    updateScenario: (scenarioId: string, scenario: ScenarioJSON) => any;
}
type Props = RouteComponentProps<RouterProps> & DispatchProps & StateProps;


class ScenarioEdit extends React.Component<Props> {
    componentDidMount() {
        this.props.fetchScenario(this.props.match.params.scenarioId);
    }

    render() {
        if (!this.props.selectedScenario) {
            return <div>Loading...</div>
        }
        return (
            <ScenarioForm
                mode="edit"
                initialValues={this.props.selectedScenario}
                form="scenarioEditForm"
                onSubmit={
                    (values) => {
                        this.props.updateScenario(
                            (this.props.selectedScenario as ScenarioJSON)._id,
                            clearNullValues(values));
                    }
                }
            />
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    selectedScenario: state.scenarios.selected

})


export default connect<any, any, any>(mapStateToProps, { fetchScenario, updateScenario })
    (ScenarioEdit);