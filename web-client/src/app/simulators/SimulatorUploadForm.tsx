import * as React from "react";
import { connect } from 'react-redux';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { SimulatorDefinition } from "../../../../simulations-manager/src/simulators/simulatorDefinition";
import { fetchSimulators, createSimulator } from "./store/actions";
import { required } from "redux-form-validators";
import { renderFieldInput, renderFieldTextArea } from "../../utils/form/renderFields";
import { SimulatorsState } from "./store/types";
import { ApplicationState } from "../types";
import { Form, Button } from "antd";
import { AInput, ATextarea, tailFormItemLayout, renderFieldFile } from "../../utils/form/reduxFormAntd";
import uniqid = require("uniqid");



interface StateProps {
    simulatorDefinitions: SimulatorDefinition[];
}

interface DispatchProps {
    fetchSimulators: () => any;
    createSimulator: (values) => any;

}

export type Props = StateProps & DispatchProps;


class SimulatorUploadForm extends React.Component<InjectedFormProps<{}, Props> & Props>{
    
    uploadId : string;

    constructor(props: InjectedFormProps<{}, Props> & Props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.uploadId = uniqid();  
    }
    onSubmit(values) {

        const valuesCopy = {...values};

        valuesCopy.configSchema = JSON.parse(valuesCopy.configSchema);
        valuesCopy.commands = JSON.parse(valuesCopy.commands);
        delete valuesCopy.dockerfile;
        this.props.createSimulator({
            simulator : valuesCopy,
            uploadId : this.uploadId
        });

    }
    render() {
        const { handleSubmit, simulatorDefinitions } = this.props;

        if (!simulatorDefinitions) {
            return <div>Loading...</div>;
        }
        console.log("rendering");
        
        return (
            <div>
                <Form onSubmit={handleSubmit(this.onSubmit)}>

                    <Field
                        name="id.imageName"
                        component={AInput}
                        validate={required()}
                        label="Image Name"
                        type="text"
                    />
                    <Field
                        name="id.version"
                        component={AInput}
                        validate={required()}
                        label="Version"
                        type="text"
                    />

                    <Field
                        name="configSchema"
                        component={ATextarea}
                        autosize={true}
                        validate={required()}
                        label="Config Schema"
                    />
                    <Field
                        name="commands"
                        component={ATextarea}
                        autosize={true}
                        validate={required()}
                        label="Commands Definition"
                    />


                    <Field
                        name="dockerfile"
                        component={renderFieldFile}
                        uploadId={this.uploadId}
                        accept=".tar"
                        validate={required()}
                    />

                    
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }

}

function mapStateToProps(state: ApplicationState): StateProps {
    return { simulatorDefinitions: state.simulators }
}

export default reduxForm<{}>({
    form: "simulatorUploadForm",
})(

    connect<StateProps,
        DispatchProps>(mapStateToProps, { fetchSimulators, createSimulator })(SimulatorUploadForm)
);