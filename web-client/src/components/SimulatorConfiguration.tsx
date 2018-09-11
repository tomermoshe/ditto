import * as React from "react";
import { connect } from 'react-redux';
import { Field, InjectedFormProps, formValueSelector } from 'redux-form';
import { SimulatorDefinition } from "../../../simulations-manager/src/simulators/simulatorDefinition";
import { renderField, DefaultTheme, context } from "liform-react";
import { renderFieldInput, renderFieldSelect } from "../utils/form/renderFields";
import { required } from "../../node_modules/redux-form-validators";


export interface InjectedProps {
    simulatorDefinitions: SimulatorDefinition[];
    simulator: any;
    index: number;
    fields: any;
}
interface ConditionalFieldsProps {
    imageName: string;
    version: string;
}
type Props = InjectedProps & ConditionalFieldsProps;


class SimulatorConfiguration extends React.Component<InjectedFormProps<{}, Props> & Props>{
    renderSimulatorImageNames() {
        const options = this.props.simulatorDefinitions.map((simulator) =>
            <option key={simulator.id.imageName} value={simulator.id.imageName}>{simulator.id.imageName}</option>
        );
        return options;
    }

    renderSimualtorVersions() {
        const selectedSimulatorImage = this.props.imageName;
        const options = this.props.simulatorDefinitions.filter((simulator => {
            return simulator.id.imageName === selectedSimulatorImage;
        })).map(simulator =>
            <option key={simulator.id.version} value={simulator.id.version}>{simulator.id.version}</option>
        );
        return options;
    }
    selectSchema() {
        const selectedSimulator = this.props.simulatorDefinitions.find(simulator =>
            simulator.id.imageName === this.props.imageName && simulator.id.version === this.props.version)
        return selectedSimulator && selectedSimulator.configSchema;
    }

    render() {
        const { error } = this.props;
        
        return (
            <li key={this.props.index}>
                <button
                    type="button"
                    title="Remove Simulator"
                    onClick={() => this.props.fields.remove(this.props.index)}
                />

                <Field
                    name={`${this.props.simulator}.name`}
                    component={renderFieldInput}
                    validate={required()}
                    label="Simulator Name"
                    type="text"
                />

                <Field
                    name={`${this.props.simulator}.id.imageName`}
                    component={renderFieldSelect}
                    validate={required()}
                    label="Image Name"
                >
                    <option />
                    {this.renderSimulatorImageNames()}
                </Field>

                {
                    this.props.imageName &&
                    <Field
                        name={`${this.props.simulator}.id.version`}
                        component={renderFieldSelect}
                        validate={required()}
                        label="Version"
                    >
                        <option />
                        {this.renderSimualtorVersions()}
                    </Field>
                }
                {this.props.imageName && this.props.version &&
                
                    <div className="form-group">
                        {renderField(this.selectSchema(),
                            "configuration",
                            DefaultTheme,
                            `${this.props.simulator}.`,
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
const selector = formValueSelector('environmentCreationForm');
export default connect(
    (state, props: any) => {
        return {
            simulatorDefinitions: props.simulatorDefinitions,
            imageName: selector(state, `${props.simulator}.id.imageName`),
            version: selector(state, `${props.simulator}.id.version`)
        }

    }
)(SimulatorConfiguration);