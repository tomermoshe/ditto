import * as React from "react";
import { connect } from "react-redux"
import { fetchSimulators } from "../actions";
import { RootState } from "../types";
import Select from "react-select";
import Form from "react-jsonschema-form";


import { SimulatorConfig } from "../../../simulations-manager/src/simulators/simulatorConfig";
import { CommandDefinition } from "../../../simulations-manager/src/commands/commandDefenition";

export interface Props {
    simulators: SimulatorConfig[];
    fetchSimulators: () => any;
}

export interface State {
    selectedSimulatorImage?: string;
    selectedSimulatorVersion?: string;
    selectedSimulatorCommand?: CommandDefinition;

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
    onSimulatorVersionSelect = (selectedSimulatorVersion) => {
        this.setState({ ...this.state, selectedSimulatorVersion: selectedSimulatorVersion.value });
    }
    onSimulatorCommandSelect = (selectedSimulatorCommand) => {
        this.setState({ ...this.state, selectedSimulatorCommand: selectedSimulatorCommand.value });
    }

    renderSimulatorNames() {
        return (
            <div>
                <h3>Image Name</h3>
                <Select
                    options={this.props.simulators.map(simulator => {
                        return {
                            value: simulator.id.imageName,
                            label: simulator.id.imageName
                        };
                    })}
                    onChange={this.onSimulatorNameSelect}

                />
            </div>

        );
    }


    renderSimualtorVersions() {

        const { selectedSimulatorImage } = this.state;
        if (!selectedSimulatorImage) {
            return <div />;
        }

        const options = this.props.simulators.filter((simulator => {
            return simulator.id.imageName === selectedSimulatorImage;
        })).map(simulator => {
            return {
                value: simulator.id.version,
                label: simulator.id.version
            };
        });

        return (
            <div>
                <h3>Version</h3>
                <Select
                    options={options}
                    onChange={this.onSimulatorVersionSelect}
                />
            </div>



        );
    }

    renderSimulatorCommands() {
        const { selectedSimulatorVersion, selectedSimulatorImage } = this.state;
        if (!selectedSimulatorVersion) {
            return <div />;
        }

        const options = this.props.simulators.filter((simulator => {
            return simulator.id.imageName === selectedSimulatorImage &&
                simulator.id.version === selectedSimulatorVersion;
        }))[0].commands.map(command => {
            return {

                value: command,
                label: command.commandName
            };
        });

        return (
            <div>
                <h3>Command</h3>
                <Select
                    options={options}
                    onChange={this.onSimulatorCommandSelect}
                />
            </div >
        );

    }
    renderCommandForm() {
        const { selectedSimulatorVersion, selectedSimulatorImage, selectedSimulatorCommand } = this.state;
        if (!selectedSimulatorVersion || !selectedSimulatorImage || !selectedSimulatorCommand) {
            return <div />;
        }
        return (
            <Form
                schema={selectedSimulatorCommand.commandSchema}
            />
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
                {this.renderSimulatorCommands()}
                {this.renderCommandForm()}
            </div>
        );
    }
}

function mapStateToProps(state: RootState) {
    return { simulators: state.simulators }
}

export default connect(mapStateToProps, { fetchSimulators })(ScenarioCreator);