import * as React from "react";
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import Select from "react-select";
import { SimulatorConfig } from "../../../simulations-manager/src/simulators/simulatorConfig";




export interface Props {
    simulators: SimulatorConfig[]
}

export interface State {

}


class SimulatorSelectorForm extends React.Component<InjectedFormProps & Props, State>{

    constructor(props: InjectedFormProps & Props) {
        super(props);
        this.state = {};
    }

    renderSimulatorImageNames() {
        const options = this.props.simulators.map((simulator) =>
            <option key={simulator.id.imageName} value={simulator.id.imageName}>{simulator.id.imageName}</option>
        );
        return options;
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
                            component="select"
                        >
                            {this.renderSimulatorImageNames()}
                        </Field>
                    </div>
                </div>
            </form>
        );
    }
}

function mapStateToProps(state: State, ownProps: Props) {
    return {
        simulators: ownProps.simulators
    }
}


export default reduxForm<{},Props>({})(connect(mapStateToProps)(SimulatorSelectorForm));

