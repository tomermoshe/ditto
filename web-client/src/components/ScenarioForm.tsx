import * as React from "react";
import { connect } from 'react-redux';
import { reduxForm, InjectedFormProps, Field, FieldArray, formValueSelector } from 'redux-form';
import { SimulatorDefinition } from "../../../simulations-manager/src/simulators/simulatorDefinition";
import { fetchSimulators, fetchEnvironments ,createScenario} from "../actions";
import { required } from "redux-form-validators";
import { renderFieldInput, renderFieldSelect } from "../utils/form/renderFields";
import { Environment } from "../../../simulations-manager/src/environments/Environment";
import ScenarioStepConfiguration from "./ScenarioStepConfiguration";
import clearNullValues from "../utils/form/clearNullValues";


export interface Props {
    simulatorDefinitions: SimulatorDefinition[];
    environments: Environment[];
    environmentName: string;
    fetchSimulators: () => any;
    fetchEnvironments: () => any;
    createScenario: (scenario) => any;
}



class ScenarioForm extends React.Component<InjectedFormProps<{}, Props> & Props>{

    componentDidMount() {
        this.props.fetchSimulators();
        this.props.fetchEnvironments();
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(values) {
         this.props.createScenario(clearNullValues(values));
    }

    renderEnvironments() {
        const options = this.props.environments.map((environment) =>
            <option key={environment.name} value={environment.name}>{environment.name}</option>
        );
        return options;
    }
    renderScenarioSteps = ({ fields, meta: { error, submitFailed } }: any) => {
        const { environmentName, simulatorDefinitions,environments } = this.props;
        const selectedEnvironment = environments.find((env) => env.name === environmentName);
        
        return (
            <ul>
                <li>
                    <button type="button" onClick={() => fields.push({})}>
                        Add Step
                </button>
                </li>
                {submitFailed && error && <span>{error}</span>}
                {
                    fields.map((step, index) => (
                        <ScenarioStepConfiguration
                            simulatorDefinitions={simulatorDefinitions}
                            environment={selectedEnvironment}
                            step={step}
                            fields={fields}
                            index={index}
                            key={index}
                        />
                    ))
                }

            </ul>
        );
    }

    render() {
        const { handleSubmit, simulatorDefinitions, environments, environmentName } = this.props;

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
                        <option />
                        {this.renderEnvironments()}
                    </Field>
                    {environmentName &&
                        <FieldArray name="steps" component={this.renderScenarioSteps} />

                    }


                    <button className="btn btn-primary" type="submit">
                        Submit
                    </button>

                </form>
            </div>
        );
    }
}


const selector = formValueSelector("scenarioForm");

function mapStateToProps(state: any) {
    console.log(state);
    return {
        simulatorDefinitions: state.simulators,
        environments: state.environments,
        environmentName: selector(state, "environment")
    }
}

export default reduxForm<{}>({
    form: "scenarioForm"
})(connect(mapStateToProps, { fetchSimulators, fetchEnvironments, createScenario })(ScenarioForm));