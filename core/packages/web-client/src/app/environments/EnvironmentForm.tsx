import * as React from "react";
import { InjectedFormProps, FieldArray, Field } from 'redux-form';
import { SimulatorDefinition, EnvironmentJSON } from "ditto-shared";
import EnvironmentSimulatorConfiguration from "./EnvironmentSimulatorConfiguration";
import { required } from "redux-form-validators";
import { Form, Button } from "antd";
import { AInput } from "../../utils/form/reduxFormAntd";
import { MenuButton } from "../shared/Buttons";



export interface OwnProps {
    mode: "create" | "edit";
    onSubmit: (values) => any;
    onCancel?: () => any;
    handleSubmit: any;
}
export interface StateProps {
    simulatorDefinitions: SimulatorDefinition[];

}
export interface DispatchProps {
    fetchSimulators: () => any;
    createEnvironment?: (values) => any;
    updateEnvironment?: (environmentId, values) => any;

}

type Props = OwnProps & StateProps & DispatchProps & InjectedFormProps<any, EnvironmentJSON>;



export class EnvironmentForm extends React.Component<Props>{

    componentDidMount() {
        this.props.fetchSimulators();
    }
    renderSimulatorInstanceIds = ({ fields, meta: { error, submitFailed } }: any) => (
        <ul>

            {submitFailed && error && <span>{error}</span>}
            {
                fields.map((simulator, index) => (
                    <EnvironmentSimulatorConfiguration
                        simulatorDefinitions={this.props.simulatorDefinitions}
                        simulator={simulator}
                        fields={fields}
                        index={index}
                        key={index}
                        form={this.props.form}
                    />
                ))
            }
            <li>
                <Button className="add-simulator--button" icon="plus" type="primary" onClick={() => fields.push({})}>
                    Add Simulator
                </Button>
            </li>
        </ul>
    );

    render() {
        const { handleSubmit, simulatorDefinitions } = this.props;

        if (!simulatorDefinitions) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <Form className="environment-form form-array" onSubmit={handleSubmit(this.props.onSubmit)}>

                    <Field
                        name="name"
                        component={AInput}
                        validate={required()}
                        label="Name"
                        hasFeedback={true}
                    />

                    <FieldArray name="simulators" component={this.renderSimulatorInstanceIds} />
                    <MenuButton htmlType="submit" type="primary">
                        {this.props.mode === "create" ? "Submit" : "Update"}
                    </MenuButton>
                    {this.props.mode === "edit" &&
                        <MenuButton type="primary" onClick={this.props.onCancel} >
                            Cancel
                        </MenuButton>
                    }

                </Form>
            </div>
        );
    }
}
