import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { fetchSimulatorNames } from "../actions";
import { RootState } from "../types";


export interface Props {
    simulatorNames: string[];
    // tslint:disable-next-line:no-any
    fetchSimulatorNames: () => any;
}

class ScenarioCreator extends React.Component<Props>{
    // tslint:disable-next-line:no-any
    renderSimulatorNames() {
        return this.props.simulatorNames.map(name => {
            return <option key={name} value={name}>{name}</option>;
        });
    }
    componentDidMount() {
        this.props.fetchSimulatorNames();
    }


    render() {
        const { simulatorNames } = this.props;
        if (!simulatorNames) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <select>
                    {this.renderSimulatorNames()}
                </select>
            </div>
        );
    }
}

function mapStateToProps(state: RootState) {
    return { simulatorNames: state.simulators }
}

export default connect(mapStateToProps, { fetchSimulatorNames })(ScenarioCreator);