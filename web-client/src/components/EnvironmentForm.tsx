import * as React from "react";
import { connect } from 'react-redux';
import { reduxForm, InjectedFormProps, FieldArray, Field } from 'redux-form';
import { SimulatorDefinition } from "../../../simulations-manager/src/simulators/simulatorDefinition";
import { fetchSimulators, createEnvironment } from "../actions";
import SimulatorConfiguration from "./SimulatorConfiguration";
import { required } from "redux-form-validators";
import { renderFieldInput } from "../utils/form/renderFields";
import clearNullValues from "../utils/form/clearNullValues";

export interface Props {
    simulatorDefinitions: SimulatorDefinition[];
    fetchSimulators: () => any;
    createEnvironment: (values) => any;


}




class SimulatorSelectorForm extends React.Component<InjectedFormProps<{}, Props> & Props>{

    componentDidMount() {
        this.props.fetchSimulators();
        this.onSubmit = this.onSubmit.bind(this);
    }
    renderSimulatorInstanceIds = ({ fields, meta: { error, submitFailed } }: any) => (
        <ul>
            <li>
                <button type="button" onClick={() => fields.push({})}>
                    Add Simulator
            </button>
            </li>
            {submitFailed && error && <span>{error}</span>}
            {
                fields.map((simulator, index) => (
                    <SimulatorConfiguration
                        simulatorDefinitions={this.props.simulatorDefinitions}
                        simulator={simulator}
                        fields={fields}
                        index={index}
                        key={index}
                    />
                ))
            }

        </ul>
    );

    onSubmit(values) {
        this.props.createEnvironment(clearNullValues(values));
    }

    render() {
        const { handleSubmit, pristine, reset, submitting, simulatorDefinitions } = this.props;

        if (!simulatorDefinitions) {
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

                    <FieldArray name="simulators" component={this.renderSimulatorInstanceIds} />
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

    return { simulatorDefinitions: state.simulators }
}

export default reduxForm<{}>({
    form: "environmentCreationForm"
})(connect(mapStateToProps, { fetchSimulators, createEnvironment })(SimulatorSelectorForm));