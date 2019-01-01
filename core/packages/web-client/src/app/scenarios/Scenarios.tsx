import * as React from "react";
import { connect } from "react-redux"
import { ApplicationState } from "../types";
import { fetchScenarios } from "./store/actions";
import { ScenarioJSON, EnvironmentJSON } from "ditto-shared";
import { List, Layout } from "antd";
import styled from "styled-components";
import { Button } from "antd";
import ScenarioView from "./ScenarioView";
import { Switch, Route, Link } from 'react-router-dom'
import ScenarioForm from "./ScenarioForm";
import { Input } from 'antd';
import AddNewButton from "../shared/AddNewButton";
import { EnvironmentUtils } from "ditto-shared";
const Search = Input.Search;

const StyledLayout = styled(Layout)`
background-color: #FFF;
position: absolute;
padding: 16px;
left: 16px;
top:16px;
bottom :16px;
right: 16px;
`;
const StyledSider = styled(Layout.Sider)`
background-color: #FFF;
overflow:auto;
`;
const StyledLink = styled(Link)`
width : 100%;
`;

const StyledContent = styled(Layout.Content)`
    padding-left: 48px;
    position: relative;
`;

interface DispatchProps {
    fetchScenarios: () => any;
}
interface StateProps {
    scenarios: ScenarioJSON[];
    selectedEnvironment: EnvironmentJSON;
}
interface OwnState {
    visibleScenarios: ScenarioJSON[];
    enabledScenarios: ScenarioJSON[];
    disabledScenarios: ScenarioJSON[];
    searchInput: string;
}


type Props = DispatchProps & StateProps;

class Scenarios extends React.Component<Props, OwnState> {

    constructor(props) {
        super(props);
        this.state = {
            visibleScenarios: [],
            disabledScenarios: [],
            enabledScenarios: [],
            searchInput: ""
        };
    }
    componentDidMount() {
        this.props.fetchScenarios();
    }

    scenariosToCategories(filter: string) {
        const filteredScenarios = [...this.filterScenarios(filter)];
        return {
            enabledScenarios: filteredScenarios.
                filter(scenario => EnvironmentUtils.canPlayScenario(this.props.selectedEnvironment, scenario)),
            disabledScenarios: filteredScenarios.
                filter(scenario => !EnvironmentUtils.canPlayScenario(this.props.selectedEnvironment, scenario))
        };
    }
    componentDidUpdate(prevProps: Props) {

        if (this.props.scenarios !== prevProps.scenarios || this.props.selectedEnvironment !== prevProps.selectedEnvironment) {
            this.setState(this.scenariosToCategories(this.state.searchInput));

        }
    }

    filterScenarios(filter: string) {
        const searchString = filter.trim().toLowerCase().replace(/[^a-z0-9]/gi, "");
        if (searchString.length > 0) {
            const filteredScenarios = this.props.scenarios.filter((scenario: ScenarioJSON) => {
                return scenario.name.toLowerCase().match(searchString);
            });
            return filteredScenarios;
        }
        else {
            return this.props.scenarios;
        }
    }

    render() {
        if (!this.props.scenarios) {
            return <div>Loading...</div>;
        }

        return (
            <StyledLayout>

                <StyledSider width="250px">
                    <Search
                        placeholder="Search Scenarios"
                        onChange={(e) => this.setState({
                            searchInput: e.target.value,
                            ...this.scenariosToCategories(e.target.value)
                        })}
                        enterButton={true}
                        value={this.state.searchInput}
                    />
                    <StyledLink to="/scenarios/new">
                        <AddNewButton>
                            Add Scenario
                        </AddNewButton>
                    </StyledLink>
                    {this.state.enabledScenarios.length > 0 && <List
                        dataSource={this.state.enabledScenarios}
                        renderItem={(scenario: ScenarioJSON) =>
                            (<List.Item><StyledLink to={`/scenarios/${scenario._id}`}><Button
                                block={true}
                            >
                                {scenario.name}
                            </Button></StyledLink></List.Item>)}
                    />}
                    {this.state.disabledScenarios.length > 0 && <List
                        dataSource={this.state.disabledScenarios}
                        renderItem={(scenario: ScenarioJSON) =>
                            (<List.Item><StyledLink to={`/scenarios/${scenario._id}`}><Button
                                block={true}
                                type="danger"
                            >
                                {scenario.name}
                            </Button></StyledLink></List.Item>)}
                    />}
                </StyledSider>
                <StyledContent>
                    <Switch>
                        <Route path='/scenarios/' exact={true} component={ScenarioForm} />
                        <Route path='/scenarios/new' component={ScenarioForm} />
                        <Route
                            exact={true}
                            path='/scenarios/:scenarioId'
                            render={(props) => (
                                <ScenarioView key={props.match.params.scenarioId} {...props} />)
                            }
                        />
                    </Switch>
                </StyledContent>
            </StyledLayout>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    scenarios: state.scenarios.all,
    selectedEnvironment: state.environments.selected
})



export default connect(mapStateToProps, { fetchScenarios })(Scenarios);
