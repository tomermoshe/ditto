import * as React from "react";
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createEnvironment } from "./store/actions";
import { fetchSimulators } from "../simulators/store/actions";
import { ApplicationState } from "../types";
import { EnvironmentForm } from "./EnvironmentForm";
import clearNullValues from "../../utils/form/clearNullValues";




const CreateEnvironmentForm = props =>
    (
        <EnvironmentForm
            {...props}
            mode="create"
            onSubmit={
                (values) =>{
                    props.createEnvironment(clearNullValues(values));
                }
            }
        />
    );



function mapStateToProps(state: ApplicationState) {

    return {
        simulatorDefinitions: state.simulators.all
    }
}

export default reduxForm({
    form: "environmentCreationForm"
})(connect<any, any, any>(mapStateToProps, { fetchSimulators, createEnvironment })(CreateEnvironmentForm));