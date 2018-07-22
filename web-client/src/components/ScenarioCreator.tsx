import * as React from "react";
import { Component, ReactEventHandler, SyntheticEvent } from "react";
import { connect } from "react-redux"
import { fetchSimulators } from "../actions";
import { RootState } from "../types";
import { SimulatorId } from "../../../simulations-manager/src/simulators/SimulatorId";

export interface Props {
    simulators: SimulatorId[];
    fetchSimulators: () => any;
}

export interface State {
    selectedSimulatorImage?: string;
}

class ScenarioCreator extends React.Component<Props, State>{
    readonly state: State;
    constructor(props: Props) {
        super(props);
        this.state = {};
        this.onSimulatorNameSelect = this.onSimulatorNameSelect.bind(this);


    }



    onSimulatorNameSelect = (ev :React.FormEvent<HTMLSelectElement>) => {
        this.setState({ selectedSimulatorImage: ev.currentTarget.value });
    }


    renderSimulatorNames() {
        return (
            <select onChange={this.onSimulatorNameSelect}>
                {
                    this.props.simulators.map(simulator => {
                        return (
                            <option
                                key={simulator.imageName}
                                value={simulator.imageName}
                            >
                                {simulator.imageName}
                            </option>
                        );
                    })
                }
            </select>

        );
    }
    renderSimualtorVersions(){
        if(!this.state.selectedSimulatorImage){
            return <div />;
        }
        return (
            <select>
                {
                    this.props.simulators.filter(simulator =>{
                        return simulator.imageName === this.state.selectedSimulatorImage; 
                    }).map(simulator => {
                        return (
                            <option
                                key={simulator.version}
                                value={simulator.version}
                            >
                                {simulator.version}
                            </option>
                        );
                    })
                }
            </select>

        );
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
                {this.renderSimulatorNames()}
                {this.renderSimualtorVersions()}


            </div>
        );
    }
}

function mapStateToProps(state: RootState) {
    return { simulators: state.simulators }
}

export default connect(mapStateToProps, { fetchSimulators })(ScenarioCreator);