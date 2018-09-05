import * as React from "react";
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import Select from "react-select";



export interface Props {
    form: string;
}

export interface State {

}

class SimulatorSelectorForm extends React.Component<InjectedFormProps, State>{

    constructor(props: InjectedFormProps) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <form>
                <div>
                    <label>Simulator Name</label>
                    <div>
                        <Field
                            name="simulatorName"
                            component="input"
                            type="text"
                            placeHolder="Simulator Name"
                        />
                    </div>
                </div>
                <div>
                    <label>Image Name</label>
                    <div>
                        <Field
                            name="imageName"
                            component={Select}
                            type="text"
                            placeHolder="Simulator Name"
                        />
                    </div>
                </div>
            </form>
        );
    }
}



export default reduxForm({})(SimulatorSelectorForm);

