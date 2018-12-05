import * as React from "react";
import { connect } from "react-redux"
import { ApplicationState } from "../types";
import { fetchScenarios } from "./store/actions";
import { ScenarioJSON } from "../../../../simulations-manager/src/scenarios/Scenario";
import { List, Layout } from "antd";
import styled from "styled-components";
import { Button } from "antd";
import ScenarioView from "./ScenarioView";
import { Switch, Route, Link, RouteComponentProps } from 'react-router-dom'
import ScenarioForm from "./ScenarioForm";
import { Input } from 'antd';
import AddNewButton from "../shared/AddNewButton";

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
overflow:scroll;
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
}
interface OwnState {
    visibleScenarios: ScenarioJSON[];
    searchInput: string;
}


type Props = DispatchProps & StateProps;

class Scenarios extends React.Component<Props, OwnState> {



    constructor(props) {
        super(props);
        this.state = {
            visibleScenarios: [],
            searchInput: ""
        };
    }
    componentDidMount() {
        this.props.fetchScenarios();

    }


    componentDidUpdate(prevProps) {
        if (this.props.scenarios !== prevProps.scenarios) {
            this.setState({ visibleScenarios: [...this.filterScenarios(this.state.searchInput)] });
        }
    }

    filterScenarios(filter: string) {
        const searchString = filter.trim().toLowerCase().replace(/[^a-z0-9]/gi,"");
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
    scenarioById(id: string): ScenarioJSON {
        return this.props.scenarios.filter(scenario => scenario._id === id)[0];
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
                            visibleScenarios: this.filterScenarios(e.target.value)
                        })}
                        enterButton={true}
                        value={this.state.searchInput}
                    />
                    <StyledLink to="/scenarios/new">
                        <AddNewButton>
                            Add Scenario
                        </AddNewButton>
                    </StyledLink>
                    <List
                        dataSource={this.state.visibleScenarios}
                        renderItem={(scenario: ScenarioJSON) =>
                            (<List.Item><StyledLink to={`/scenarios/${scenario._id}`}><Button
                                block={true}
                            >
                                {scenario.name}
                            </Button></StyledLink></List.Item>)}
                    />
                </StyledSider>
                <StyledContent>
                    <Switch>
                        <Route path='/scenarios/new' component={ScenarioForm} />
                        <Route
                            exact={true}
                            path='/scenarios/:scenarioId'
                            component={props =>
                                <ScenarioView
                                    findScenarioById={this.scenarioById.bind(this)}
                                    {...props}
                                />
                            }
                        />
                    </Switch>
                </StyledContent>
            </StyledLayout>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    scenarios: state.scenarios.all
})



export default connect(mapStateToProps, { fetchScenarios })(Scenarios);
