import * as React from "react";
import { connect } from 'react-redux';
import { reduxForm, InjectedFormProps, Field, FieldArray, formValueSelector } from 'redux-form';
import { SimulatorDefinition } from "../../../../simulations-manager/src/simulators/simulatorDefinition";
import { fetchSimulators } from "../simulators/store/actions";
import { fetchEnvironments } from "../environments/store/actions";
import { createScenario } from "./store/actions";
import { required } from "redux-form-validators";
import { Environment } from "../../../../simulations-manager/src/environments/Environment";
import ScenarioStepConfiguration from "./ScenarioStepConfiguration";
import clearNullValues from "../../utils/form/clearNullValues";
import { ApplicationState } from "../types";
import { Button, Form, Select } from "antd";
import { AInput, ASelect } from "../../utils/form/reduxFormAntd";


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
            <Select.Option key={environment.name}>{environment.name}</Select.Option>
        );
        return options;
    }
    renderScenarioSteps = ({ fields, meta: { error, submitFailed } }: any) => {
        const { environmentName, simulatorDefinitions, environments } = this.props;
        const selectedEnvironment = environments.find((env) => env.name === environmentName);

        return (
            <ul>
                <li>
                    <Button icon="plus" type="primary" onClick={() => fields.push({})}>
                        Add Step
                    </Button>
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

        if (!simulatorDefinitions || !environments || simulatorDefinitions.length === 0 || environments.length === 0) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <Form className="form-array" onSubmit={handleSubmit(this.onSubmit)}>

                    <Field
                        name="name"
                        component={AInput}
                        validate={required()}
                        label="Name"
                        type="text"
                    />
                    <Field
                        name="environment"
                        component={ASelect}
                        validate={required()}
                        label="Environment"
                    >
                        {this.renderEnvironments()}
                    </Field>
                    {environmentName &&
                        <FieldArray name="steps" component={this.renderScenarioSteps} />

                    }


                    <Button type="primary" htmlType="submit">Submit</Button>


                </Form>
            </div>
        );
    }
}


const selector = formValueSelector("scenarioForm");

function mapStateToProps(state: ApplicationState) {
    // console.log(state);
    return {
        simulatorDefinitions: state.simulators,
        environments: state.environments.all,
        environmentName: selector(state, "environment")
    }
}

export default reduxForm<{}>({
    form: "scenarioForm"
})(connect(mapStateToProps, { fetchSimulators, fetchEnvironments, createScenario })(ScenarioForm));