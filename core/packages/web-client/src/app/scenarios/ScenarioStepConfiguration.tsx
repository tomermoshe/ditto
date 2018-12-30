import * as React from "react";
import { connect } from 'react-redux';
import { Field, InjectedFormProps, formValueSelector } from 'redux-form';
import { SimulatorDefinition } from "ditto-shared";
import { SimulatorInstanceId } from "ditto-shared";
import { required } from "redux-form-validators";
import { Environment } from "ditto-shared";
import { CommandDefinition } from "ditto-shared";
import { ApplicationState } from "../types";
import { Button, Select } from "antd";
import { ASelect } from "../../utils/form/reduxFormAntd";
import { EmbeddedLiform } from "pavelkh-liform-react";
import AntdTheme from "liform-react-antd-theme";

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
type Props = InjectedProps & ConditionalFieldsProps;


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
        return commandDefinition.commandSchema;
    }

    render() {
        const { error, simulatorName, commandName } = this.props;
        if (simulatorName) {
            this.selectedSimulatorDefinition = this.findSelectedSimulatorDefinition();
        }
        if (simulatorName && commandName) {
            this.selctedCommandSchema = this.findCommandSchema();
        }
        return (
            <li key={this.props.index}>
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
                        theme={AntdTheme}
                        fieldName="body"
                        prefix={`${this.props.step}.command.`}
                    />
                }
            </li>
        );
    }
}
const selector = formValueSelector('scenarioForm');
export default connect(
    (state: ApplicationState, props: any) => {
        return {
            simulatorDefinitions: props.simulatorDefinitions,
            environment: props.environment,
            simulatorName: selector(state, `${props.step}.simulatorName`),
            commandName: selector(state, `${props.step}.command.name`)
        }

    }
)(ScenarioStepConfiguration);