import * as React from "react";
import { connect } from 'react-redux';
import { Field, InjectedFormProps, formValueSelector } from 'redux-form';
import { SimulatorDefinition } from "../../../../simulations-manager/src/simulators/simulatorDefinition";
import { EmbeddedLiform } from "pavelkh-liform-react";
import AntdTheme from "liform-react-antd-theme";
import { required } from "redux-form-validators";
import { AInput, ASelect } from "../../utils/form/reduxFormAntd";
import { Select, Button } from "antd";
const { Option } = Select;


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


class EnvironmentSimulatorConfiguration extends React.Component<InjectedFormProps<{}, Props> & Props>{
    renderSimulatorImageNames() {
        const options = this.props.simulatorDefinitions.
            filter((simulator) => simulator.id.imageName !== "Manager")
            .map((simulator) =>
                <Option key={simulator.id.imageName}>{simulator.id.imageName}</Option>
            );
        return options;
    }

    renderSimualtorVersions() {
        const selectedSimulatorImage = this.props.imageName;
        const options = this.props.simulatorDefinitions.filter((simulator => {
            return simulator.id.imageName === selectedSimulatorImage;
        })).map(simulator =>
            <Option key={simulator.id.version}>{simulator.id.version}</Option>
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
                <Button
                    type="danger"
                    className="remove-item--button"
                    title="Remove Simulator"
                    icon="delete"
                    onClick={() => this.props.fields.remove(this.props.index)}
                />

                <Field
                    name={`${this.props.simulator}.name`}
                    component={AInput}
                    validate={required()}
                    normalize={value => value && value.toLowerCase()}
                    label="Simulator Name"
                    type="text"
                    hasFeedback={true}
                />

                <Field
                    name={`${this.props.simulator}.id.imageName`}
                    component={ASelect}
                    validate={required()}
                    label="Image Name"
                    hasFeedback={true}
                >
                    {this.renderSimulatorImageNames()}
                </Field>

                {
                    this.props.imageName &&
                    <Field
                        name={`${this.props.simulator}.id.version`}
                        component={ASelect}
                        validate={required()}
                        label="Version"
                    >
                        {this.renderSimualtorVersions()}
                    </Field>
                }
                {this.props.imageName && this.props.version &&

                    <EmbeddedLiform
                        schema={this.selectSchema()}
                        theme={AntdTheme}
                        fieldName="configuration"
                        prefix={`${this.props.simulator}.`}
                    />

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
)(EnvironmentSimulatorConfiguration);