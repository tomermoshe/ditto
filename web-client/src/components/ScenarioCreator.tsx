import * as React from "react";
import { Component, ReactEventHandler, SyntheticEvent } from "react";
import { connect } from "react-redux"
import { fetchSimulators } from "../actions";
import { RootState } from "../types";
import Select from "react-select";

import { SimulatorId } from "../../../simulations-manager/src/simulators/simulatorId";

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



    onSimulatorNameSelect = (selectedSimulatorImage) => {
        this.setState({ selectedSimulatorImage: selectedSimulatorImage.value });
    }


    renderSimulatorNames() {
        return (
            <div>
                <h3>Simulator Name</h3>
                <Select
                    options={this.props.simulators.map(simulator => {
                        return {
                            value: simulator.imageName,
                            label: simulator.imageName
                        };
                    })}
                    onChange={this.onSimulatorNameSelect}

                />
            </div>

        );
    }


    renderSimualtorVersions() {

        const selectedSimulatorImage = this.state.selectedSimulatorImage;
        if (!selectedSimulatorImage) {
            return <div />;
        }

        const options = this.props.simulators.filter((simulator => {
            return simulator.imageName === selectedSimulatorImage;
        })).map(simulator => {
            return {
                value: simulator.version,
                label: simulator.version
            };
        });

        return (
            <div>
                <h3>Version</h3>
                <Select
                    options={options}
                />
            </div>



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