import * as React from "react";
import { connect } from 'react-redux';
import { Field, InjectedFormProps, formValueSelector } from 'redux-form';
import { SimulatorDefinition } from "../../../simulations-manager/src/simulators/simulatorDefinition";
import { SimulatorInstanceId } from "../../../simulations-manager/src/simulators/simulatorInstanceId";
import { renderField, DefaultTheme, context } from "liform-react";
import { renderFieldInput, renderFieldSelect } from "../utils/form/renderFields";
import { required } from "../../node_modules/redux-form-validators";
import { Environment } from "../../../simulations-manager/src/environments/Environment";
import { CommandDefinition } from "../../../simulations-manager/src/commands/commandDefenition";


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

    renderCommandNames() {
        return this.selectedSimulatorDefinition.commands.map(command =>
            <option key={command.commandName} value={command.commandName}>{command.commandName}</option>
        );
    }
    findSelectedSimulatorDefinition() {
        const selectedSimulatorInstance = this.props.environment.simulators.
            find(simulator => simulator.name === this.props.simulatorName) as SimulatorInstanceId;

        return this.props.simulatorDefinitions.find((simulator) =>
            simulator.id.imageName === selectedSimulatorInstance.id.imageName &&
            simulator.id.version === selectedSimulatorInstance.id.version) as SimulatorDefinition;
    }


    renderSimulatorNames() {
        console.log(JSON.stringify(this.props.environment));

        return this.props.environment.simulators.map((simulator) => (
            <option key={simulator.name} value={simulator.name}>{simulator.name}</option>
        ));
    }
    selectCommandSchema() {
        const commandDefinition = this.selectedSimulatorDefinition.commands.
        find(command => command.commandName === this.props.commandName) as CommandDefinition;
        return commandDefinition.commandSchema;
    }

    render() {
        const { error, simulatorName, commandName } = this.props;
        if (simulatorName) {
            this.selectedSimulatorDefinition = this.findSelectedSimulatorDefinition();
        }
        return (
            <li key={this.props.index}>
                <button
                    type="button"
                    title="Remove Step"
                    onClick={() => this.props.fields.remove(this.props.index)}
                />

                <Field
                    name={`${this.props.step}.simulatorName`}
                    component={renderFieldSelect}
                    validate={required()}
                    label="Simulator Name"
                >
                    <option />
                    {this.renderSimulatorNames()}
                </Field>
                {simulatorName &&
                    <Field
                        name={`${this.props.step}.command.name`}
                        component={renderFieldSelect}
                        validate={required()}
                        label="Command Name"
                    >
                        <option />
                        {this.renderCommandNames()}
                    </Field>
                }
                {simulatorName && commandName &&
                    <div className="form-group">
                        {renderField(this.selectCommandSchema(),
                            "body",
                            DefaultTheme,
                            `${this.props.step}.command.`,
                            context)}
                        {/* <div>{error && <strong>{error}</strong>}</div>
                         <button className="btn btn-primary" type="submit">
                                 Submit
                             </button> */}
                    </div>
                }
            </li>
        );
    }
}
const selector = formValueSelector('scenarioForm');
export default connect(
    (state, props: any) => {
        return {
            simulatorDefinitions: props.simulatorDefinitions,
            environment: props.environment,
            simulatorName: selector(state, `${props.step}.simulatorName`),
            commandName: selector(state, `${props.step}.command.name`)
        }

    }
)(ScenarioStepConfiguration);