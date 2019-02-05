import * as React from "react";
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createScenario } from "./store/actions";
import ScenarioForm from "./ScenarioForm";
import clearNullValues from "../../utils/form/clearNullValues";




const ScenarioCreate = props =>
    (
        <ScenarioForm
            {...props}
            mode="create"
            form="scenarioCreateForm"
            onSubmit={
                (values) => {
                    props.createScenario(clearNullValues(values));
                }
            }
        />
    );


export default(connect<any,any,any>(null, { createScenario })(ScenarioCreate));