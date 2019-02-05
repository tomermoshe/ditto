import * as React from "react";
import { connect } from 'react-redux';
import { Field, InjectedFormProps, formValueSelector, change } from 'redux-form';
import { SimulatorDefinition } from "ditto-shared";
import { SimulatorInstanceId } from "ditto-shared";
import { required } from "redux-form-validators";
import { Environment } from "ditto-shared";
import { CommandDefinition } from "ditto-shared";
import { ApplicationState } from "../types";
import { Button, Select } from "antd";
import { ASelect } from "../../utils/form/reduxFormAntd";
import { EmbeddedLiform } from "pavelkh-liform-react";
import { AntdThemeFieldValidation } from "liform-react-antd-theme";
import { FormLi } from "../shared/FormLi";


export interface InjectedProps {
    simulatorDefinitions: SimulatorDefinition[];
    environment: Environment
    step: any;
    index: number;
    fields: any;
}
interface ConditionalFieldsProps {
    simulatorName: string;
    commandName: string;
}
interface DispatchProps {
    change(form: string, field: string, value: any, touch?: boolean, persistentSubmitErrors?: boolean): any;
}
type Props = InjectedProps & ConditionalFieldsProps & DispatchProps;


class ScenarioStepConfiguration extends React.Component<InjectedFormProps<{}, Props> & Props>{

    selectedSimulatorDefinition: SimulatorDefinition;
    selctedCommandSchema: any;

    renderCommandNames() {
        return this.selectedSimulatorDefinition.commands.map(command =>
            <Select.Option key={command.commandName}>{command.commandName}</Select.Option>
        );
    }
    findSelectedSimulatorDefinition() {

        if (this.props.simulatorName === "Manager") {
            return this.props.simulatorDefinitions.find((simulator) =>
                simulator.id.imageName === "Manager") as SimulatorDefinition;
        }
        const selectedSimulatorInstance = this.props.environment.simulators.
            find(simulator => simulator.name === this.props.simulatorName) as SimulatorInstanceId;

        return this.props.simulatorDefinitions.find((simulator) =>
            simulator.id.imageName === selectedSimulatorInstance.id.imageName &&
            simulator.id.version === selectedSimulatorInstance.id.version) as SimulatorDefinition;
    }


    renderSimulatorNames() {
        console.log(JSON.stringify(this.props.environment));
        const environmentSimulatorOptions = this.props.environment.simulators.map((simulator) => (
            <Select.Option key={simulator.name}>{simulator.name}</Select.Option>
        ));
        const localCommandsSimulatorOption =
            <Select.Option key="Manager">Manager</Select.Option>;
        environmentSimulatorOptions.push(localCommandsSimulatorOption)
        return environmentSimulatorOptions;
    }
    findCommandSchema() {
        const commandDefinition = this.selectedSimulatorDefinition.commands.
            find(command => command.commandName === this.props.commandName) as CommandDefinition;
        return commandDefinition && commandDefinition.commandSchema;
    }
    componentDidUpdate(oldProps: Props) {
        // If the step just moved in index we have nothing to initialize
        if(oldProps.fields.length !== this.props.fields.length){
            return; 
        }
        if(this.wasCommandNameChanged(oldProps)) {
            this.initializeSimulatorCommnndBody();
        }
        if (this.wasSimulatorNameChanged(oldProps)) {
            this.initializeSimulatorCommand();
        }
    }

 
    render() {
        const { simulatorName, commandName } = this.props;
        if (simulatorName) {
            this.selectedSimulatorDefinition = this.findSelectedSimulatorDefinition();
        }
        if (simulatorName && commandName) {
            this.selctedCommandSchema = this.findCommandSchema();
        }
        return (
            <FormLi even={this.props.index % 2 === 0} key={this.props.index}>
                <h4>Step #{this.props.index + 1}</h4>

                <Button
                    type="danger"
                    className="remove-item--button"
                    icon="delete"
                    title="Remove Step"
                    onClick={() => this.props.fields.remove(this.props.index)}
                />

                <Field
                    name={`${this.props.step}.simulatorName`}
                    component={ASelect}
                    validate={required()}
                    label="Simulator Name"
                >
                    {this.renderSimulatorNames()}
                </Field>
                {simulatorName &&
                    <Field
                        name={`${this.props.step}.command.name`}
                        component={ASelect}
                        validate={required()}
                        label="Command Name"
                    >
                        {this.renderCommandNames()}
                    </Field>
                }
                {this.selctedCommandSchema &&
                    <EmbeddedLiform
                        schema={this.selctedCommandSchema}
                        theme={AntdThemeFieldValidation}
                        fieldName="body"
                        prefix={`${this.props.step}.command.`}
                    />
                }
            </FormLi>
        );
    }
    private wasSimulatorNameChanged(oldProps: Props) {
        return oldProps.simulatorName !== this.props.simulatorName;
    }
    private wasCommandNameChanged(oldProps: Props) {
        return oldProps.commandName !== this.props.commandName;
    }
    private initializeSimulatorCommand() {
        this.props.change(this.props.form, `${this.props.step}.command.name`, null);
        this.props.change(this.props.form, `${this.props.step}.command.body`, null);
    }

    private initializeSimulatorCommnndBody() {
        this.props.change(this.props.form, `${this.props.step}.command.body`, null);
    }

}
export default connect(
    (state: ApplicationState, props: any) => {
        const selector = formValueSelector(props.form);

        return {
            simulatorDefinitions: props.simulatorDefinitions,
            environment: props.environment,
            simulatorName: selector(state, `${props.step}.simulatorName`),
            commandName: selector(state, `${props.step}.command.name`)
        }

    },
    { change })(ScenarioStepConfiguration);