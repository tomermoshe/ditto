import * as React from "react";
import { connect } from 'react-redux';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { SimulatorDefinition } from "../../../simulations-manager/src/simulators/simulatorDefinition";
import { fetchSimulators, createSimulator } from "../actions";
import { required } from "redux-form-validators";
import { renderFieldInput, renderFieldTextArea, renderFieldFile } from "../utils/form/renderFields";



interface StateProps {
    simulatorDefinitions: SimulatorDefinition[];
}

interface DispatchProps {
    fetchSimulators: () => any;
    createSimulator: (values) => any;

}

export type Props = StateProps & DispatchProps;


class SimulatorUploadForm extends React.Component<InjectedFormProps<{}, Props> & Props>{
    fileInput: React.RefObject<HTMLInputElement>;

    constructor(props: InjectedFormProps<{}, Props> & Props) {
        super(props);
        this.fileInput = React.createRef();
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(values) {
        
        const valuesCopy = Object.assign({},values);

        const file = valuesCopy.dockerfile as File;
        valuesCopy.dockerfile = new File([file.slice(0,-1)] ,`${values.id.imageName}_${values.id.version}.tar`);
        valuesCopy.configSchema = JSON.parse(valuesCopy.configSchema);
        valuesCopy.commands = JSON.parse(valuesCopy.commands);
        this.props.createSimulator(valuesCopy);
   
    }
    render() {
        const { handleSubmit, simulatorDefinitions } = this.props;

        if (!simulatorDefinitions) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <form onSubmit={handleSubmit(this.onSubmit)}>

                    <Field
                        name="id.imageName"
                        component={renderFieldInput}
                        validate={required()}
                        label="Image Name"
                        type="text"
                    />
                    <Field
                        name="id.version"
                        component={renderFieldInput}
                        validate={required()}
                        label="Version"
                        type="text"
                    />

                    <Field
                        name="configSchema"
                        component={renderFieldTextArea}
                        validate={required()}
                        label="Config Schema"
                    />
                    <Field
                        name="commands"
                        component={renderFieldTextArea}
                        validate={required()}
                        label="Commands Definition"
                    />


                    <Field
                        name="dockerfile"
                        component={renderFieldFile}
                        accept=".tar"
                        label="Simulator dockerfile tar"
                        validate={required()}
                    />

                    <button className="btn btn-primary" type="submit">
                        Submit
                    </button>

                </form>
            </div>
        );
    }

}

function mapStateToProps(state: any): StateProps {
    // console.log(state);
    return { simulatorDefinitions: state.simulators }
}

export default reduxForm<{}>({
    form: "simulatorUploadForm",
})(
        
connect<StateProps,
    DispatchProps>(mapStateToProps, { fetchSimulators, createSimulator })(SimulatorUploadForm)
);