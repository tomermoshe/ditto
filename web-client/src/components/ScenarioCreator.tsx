import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux"
import { fetchSimulators } from "../actions";
import { RootState } from "../types";
import { SimulatorId } from "../../../simulations-manager/src/simulators/SimulatorId";

export interface Props {
    simulators: SimulatorId[];
    fetchSimulators: () => any;
}

class ScenarioCreator extends React.Component<Props>{
    renderSimulatorNames() {
        return this.props.simulators.map(simulator => {
            return <option key={simulator.imageName} value={simulator.imageName}>{simulator.imageName}</option>;
        });
    }
    componentDidMount() {
        this.props.fetchSimulators();
    }


    render() {
        const { simulators } = this.props;
        if (!simulators) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <select >
                    {this.renderSimulatorNames()}
                </select>
             
            </div>
        );
    }
}

function mapStateToProps(state: RootState) {
    return { simulators: state.simulators }
}

export default connect(mapStateToProps, { fetchSimulators })(ScenarioCreator);