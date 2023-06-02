import React, {Component} from "react";
import '../../style/team/Team.css';
import {NavLink} from "react-router-dom";
import Header from "../header/Header.jsx";

class Teams extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teams: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/teams')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    teams: data
                })
            }).catch(function (error) {
            console.log(error);
        })
    }

    processTeam(index, team) {
        return (
            <>
                <tr>
                    <td>{index}</td>
                        <td>
                            <NavLink className={"nav-link"} to={"/team"} onClick={() => localStorage.setItem("teamId", team.id)}>
                                {team.name}
                            </NavLink>
                        </td>
                </tr>
            </>
        )
    }

    render() {
        const processedTeams = React.Children.toArray(this.state.teams.map((team) =>
            this.processTeam(this.state.teams.indexOf(team) + 1, team)));

        return (
            <div>
                <Header/>
                <div className={"teams"}>
                    <div className={"table"}>
                        <table className="table table-bordered table-dark">
                            <thead>
                            <tr>
                                <th scope="col">№</th>
                                <th scope="col">Name</th>
                            </tr>
                            </thead>
                            <tbody>
                            {processedTeams}
                            </tbody>
                        </table>
                    </div>
                    <div className={"button"}>
                        <NavLink to={"/addTeam"}>
                            <button id={"teamsCreateNewTeamButton"} type="button" className="btn btn-dark">Create new team</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }

}

export default Teams;