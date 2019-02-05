import * as React from "react";
import { connect } from 'react-redux';
import { InjectedFormProps, Field, FieldArray, formValueSelector, reduxForm } from 'redux-form';
import { SimulatorDefinition, EnvironmentUtils, ScenarioJSON, EnvironmentJSON } from "ditto-shared";
import { fetchSimulators } from "../simulators/store/actions";
import { fetchEnvironments } from "../environments/store/actions";
import { createScenario } from "./store/actions";
import { required, length } from "redux-form-validators";
import { Environment } from "ditto-shared";
import ScenarioStepConfiguration from "./ScenarioStepConfiguration";
import { ApplicationState } from "../types";
import { Button, Form, Select } from "antd";
import { AInput, ASelect, tailFormItemLayout } from "../../utils/form/reduxFormAntd";



interface StateProps {
    simulatorDefinitions: SimulatorDefinition[];
    environments: Environment[];
    environmentName: string;

}
interface DispatchProps {
    fetchSimulators: () => any;
    fetchEnvironments: () => any;
    createScenario: (scenario) => any;
}

interface OwnProps {
    mode: "edit" | "create";
    onSubmit: (s: any) => any;
}
type Props = StateProps & DispatchProps & OwnProps;



class ScenarioForm extends React.Component<InjectedFormProps<{}, Props> & Props>{


    componentDidMount() {
        this.props.fetchSimulators();
        this.props.fetchEnvironments();
    }



    renderEnvironments() {
        let environments: Environment[] = this.props.environments;
        if (this.props.mode === "edit") {
            const edittableScenario = this.props.initialValues as ScenarioJSON;

            environments = this.props.environments
                .filter((environment) =>
                    EnvironmentUtils.canPlayScenario(environment, edittableScenario));
        }
        return environments.map((environment) =>
            <Select.Option key={environment.name} value={environment.name}>{environment.name}</Select.Option>
        );

    }
    renderScenarioSteps = ({ fields, meta: { error, submitFailed } }: any) => {
        const { environmentName, simulatorDefinitions, environments } = this.props;
        const selectedEnvironment = environments.find((env) => env.name === environmentName);

        return (
            <ul>

                {submitFailed && error && <span>{error}</span>}
                {
                    fields.map((step, index) => (
                        <ScenarioStepConfiguration
                            simulatorDefinitions={simulatorDefinitions}
                            environment={selectedEnvironment}
                            step={step}
                            fields={fields}
                            form={this.props.form}
                            index={index}
                            key={index}
                        />
                    ))
                }
                <li>
                    <Button icon="plus" type="dashed" onClick={() => fields.push({})}>
                        Add Step
                    </Button>

                </li>

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
                <Form className="form-array" onSubmit={handleSubmit(this.props.onSubmit)}>
                    <h4>Scenario</h4>

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
                        <FieldArray
                            name="steps"
                            component={this.renderScenarioSteps}
                            validate={length(
                                {
                                    min: 1,
                                    msg: "Please add at least one step"
                                })}
                        />

                    }

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>

                </Form>
            </div >
        );
    }
}



function mapStateToProps(state: ApplicationState, props: any) {
    const selector = formValueSelector(props.form);

    return {
        simulatorDefinitions: state.simulators.all,
        environments: state.environments.all,
        environmentName: selector(state, "environment")
    }
}

export default connect(mapStateToProps, { fetchSimulators, fetchEnvironments, createScenario })(
    reduxForm({
        form: "scenarioForm"
    })(ScenarioForm)
);