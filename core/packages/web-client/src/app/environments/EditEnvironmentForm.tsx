import * as React from "react";
import { connect } from 'react-redux';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { updateEnvironment } from "./store/actions";
import { fetchSimulators } from "../simulators/store/actions";
import { ApplicationState } from "../types";
import { EnvironmentForm } from "./EnvironmentForm";
import clearNullValues from "../../utils/form/clearNullValues";
import { StateProps } from "./EnvironmentForm";
import { EnvironmentJSON } from "ditto-shared";


interface OwnProps {
    environment: EnvironmentJSON;
    onCancel: () => any;
}
interface DispatchProps {
    fetchSimulators: () => any;
    updateEnvironment: (environmentId, values) => any;
}

type Props = DispatchProps & StateProps & OwnProps & InjectedFormProps<any, EnvironmentJSON>;

const EditEnvironmentForm = (props: Props) =>
    (
        <EnvironmentForm
            {...props}
            mode="edit"
            onCancel={props.onCancel}
            onSubmit={
                (values) => {
                    props.updateEnvironment(props.environment._id, clearNullValues(values));
                }
            }
        />
    );



function mapStateToProps(state: ApplicationState, ownProps) {

    return {
        simulatorDefinitions: state.simulators.all,
        initialValues: ownProps.environment
    }
}


export default connect<StateProps, DispatchProps, any>(mapStateToProps, { fetchSimulators, updateEnvironment })
    (reduxForm({
        form: "environmentEditForm"
    })(EditEnvironmentForm));