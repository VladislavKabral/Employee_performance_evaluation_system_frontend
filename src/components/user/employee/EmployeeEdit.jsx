import React, {Component} from "react";
import '../../../style/user/Profile.css'
import Header from "../../header/Header.jsx";
import {NavLink} from "react-router-dom";

class EmployeeEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            salary: {},
            team: {},
            manager: {},
            users: [],
            isModal: false,
            teams: [],
            salaries: [400, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000]
        }
    }

    componentDidMount() {
        fetch(`http://localhost:8080/users/${localStorage.getItem("userId")}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    user: data,
                    salary: data.salary,
                    team: data.team,
                    manager: data.manager
                })
            }).catch(function (error) {
            console.log(error);
        })

        fetch(`http://localhost:8080/users`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    users: data
                })
                let managerId = this.state.manager.userId;
                this.state.users.forEach((user) => {
                    if (user.id === managerId) {
                        this.state.manager = user;
                    }
                })
            }).catch(function (error) {
            console.log(error);
        })

        fetch(`http://localhost:8080/teams`, {
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
    }

    generateSalarySelector() {
        let options = [];
        this.state.salaries.map((salary) => {
            options.push(<option>{salary}</option>);
        })

        return (
            React.Children.toArray(options)
        )
    }

    generateTeamSelector() {
        let options = [];
        this.state.teams.map((team) => {
            if (team.name === localStorage.getItem("userTeam")) {
                options.push(<option selected={true}>{team.name}</option>);
            } else {
                options.push(<option>{team.name}</option>);
            }
        })

        return (
            React.Children.toArray(options)
        )
    }

    async editUser() {
        const salaryInput = document.getElementById('salary');
        const salary = salaryInput.value;
        let requestSalary = {
            value: salary
        };

        const teamInput = document.getElementById('team');
        const team = teamInput.value;
        let requestTeam = {
            name: team
        };

        let cache = [];
        if (salary && team) {
            await fetch(`http://localhost:8080/users/${localStorage.getItem("userId")}/edit`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
                },
                body: JSON.stringify({salary: requestSalary, team: requestTeam}, function(key, value) {
                    if (typeof value === 'object' && value !== null) {
                        if (cache.indexOf(value) !== -1) {
                            return;
                        }
                        cache.push(value);
                    }
                    return value;
                })
            })
            window.location.assign("/employeeProfile");
        }
    }

    render() {
        return (
            <div>
                <Header/>
                <div className={"editEmployee"}>
                    <h1>{this.state.user.lastname + " " + this.state.user.firstname}</h1>
                    <div className={"editSalary"}>
                        <h3>Salary: </h3>
                        <select className="form-control" id={"salary"}
                                defaultValue={localStorage.getItem("userSalary")}>
                            {this.generateSalarySelector()}
                        </select>
                    </div>
                    <div className={"editTeam"}>
                        <h3>Team: </h3>
                        <select className="form-control" id={"team"}
                                defaultValue={localStorage.getItem("userTeam")}>
                            {this.generateTeamSelector()}
                        </select>
                    </div>
                    <div className={"editEmployeeEditButton"}>
                        <button id={"editEmployeeEditButton"} type="button" className="btn btn-dark"
                                onClick={this.editUser}>
                            Edit</button>
                    </div>
                    <div className={"editEmployeeBackButton"}>
                        <NavLink to={"/employeeProfile"}>
                            <button id={"editEmployeeBackButton"} type="button" className="btn btn-dark">Back</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

export default EmployeeEdit;