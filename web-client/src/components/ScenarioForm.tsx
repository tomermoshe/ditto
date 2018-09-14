import * as React from "react";
import { connect } from 'react-redux';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { SimulatorDefinition } from "../../../simulations-manager/src/simulators/simulatorDefinition";
import { fetchSimulators, fetchEnvironments } from "../actions";
import { required } from "redux-form-validators";
import { renderFieldInput, renderFieldSelect } from "../utils/form/renderFields";
import { Environment } from "../../../simulations-manager/src/environments/Environment";


export interface Props {
    simulatorDefinitions: SimulatorDefinition[];
    environments: Environment[];
    fetchSimulators: () => any;
    fetchEnvironments: () => any;
}



class ScenarioForm extends React.Component<InjectedFormProps<{}, Props> & Props>{

    componentDidMount() {
        this.props.fetchSimulators();
        this.props.fetchEnvironments();
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        // this.props.createEnvironment(clearNullValues(values));
    }

    renderEnvironments(){
        const options = this.props.environments.map((environment) =>
            <option key={environment.name} value={environment.name}>{environment.name}</option>
        );
        return options;
    }

    render() {
        const { handleSubmit, simulatorDefinitions, environments } = this.props;

        if (!simulatorDefinitions || !environments) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <form onSubmit={handleSubmit(this.onSubmit)}>

                    <Field
                        name="name"
                        component={renderFieldInput}
                        validate={required()}
                        label="Name"
                        type="text"
                    />
                    <Field
                        name="environment"
                        component={renderFieldSelect}
                        validate={required()}
                        label="Environment"
                    >
                        {this.renderEnvironments()}
                    </Field>

                    <button className="btn btn-primary" type="submit">
                        Submit
                    </button>

                </form>
            </div>
        );
    }
}
function mapStateToProps(state: any) {
    console.log(state);

    return {
        simulatorDefinitions: state.simulators,
        environments: state.environments
    }
}

export default reduxForm<{}>({
    form: "scenarioForm"
})(connect(mapStateToProps, { fetchSimulators, fetchEnvironments })(ScenarioForm));