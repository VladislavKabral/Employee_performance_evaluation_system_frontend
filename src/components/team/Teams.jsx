import React, {Component} from "react";
import '../../style/team/Team.css';
import {NavLink} from "react-router-dom";
import Header from "../header/Header.jsx";

class Teams extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            currentTeams: [],
            currentPage: 0
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/teams', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    teams: data
                })
            }).catch(function (error) {
            console.log(error);
        })

        this.getCurrentTeams(this.state.currentPage);
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

    async getCurrentTeams(pageNumber) {
        await fetch(`http://localhost:8080/teams/page/${pageNumber}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }
        }).then(response => response.json())
            .then(data => {
                this.setState({
                    currentTeams: data
                })
            }).catch(function (error) {
                console.log(error);
            });
        this.componentDidMount();
    }

    generatePageLink(index) {
        return (
            <>
                <li className="page-item"><a className="page-link"
                                             onClick={() => this.setState({currentPage: index - 1})}>{index}</a></li>
            </>
        )
    }

    handleClickToPreviousPage = () => {
        const page = this.state.currentPage;

        if (page > 0) {
            this.setState({currentPage:  this.state.currentPage - 1})
        }
    }

    handleClickToNextPage = (pageCount) => {
        const page = this.state.currentPage;

        if (page < pageCount - 1) {
            this.setState({currentPage:  this.state.currentPage + 1})
        }
    }

    render() {
        const processedTeams = React.Children.toArray(this.state.currentTeams.map((team) =>
            this.processTeam(this.state.currentTeams.indexOf(team) + 1, team)));

        const countOfPages = Math.ceil(this.state.teams.length / 10);

        let tempLinks = [];
        for (let i = 1; i <= countOfPages; i++) {
            tempLinks.push(this.generatePageLink(i));
        }

        const pageLinks = React.Children.toArray(tempLinks);

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
                    <div className={"teamsCreateNewTeamButton"}>
                        {localStorage.getItem("currentUserRole") === "DIRECTOR" &&
                            <NavLink to={"/addTeam"}>
                                <button id={"teamsCreateNewTeamButton"} type="button" className="btn btn-dark">Create new team</button>
                            </NavLink>
                        }
                    </div>
                    <div className={"teamsPages"}>
                        <nav aria-label="Page navigation">
                            <ul className="pagination">
                                <li className="page-item"><a className="page-link"
                                                             onClick={() => this.handleClickToPreviousPage()}>
                                    Previous</a></li>
                                {pageLinks}
                                <li className="page-item"><a className="page-link"
                                                             onClick={() => this.handleClickToNextPage(countOfPages)}>
                                    Next</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }

}

export default Teams;