import React, {Component} from "react";
import '../../../style/user/Profile.css'
import Header from "../../header/Header.jsx";
import {NavLink} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

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
            salaries: [400, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000],
            managers: []
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

        fetch(`http://localhost:8080/users/managers`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    managers: data
                })
                localStorage.setItem("managers", JSON.stringify(this.state.managers));
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

    generateManagerSelector() {
        let options = [];
        this.state.managers.map((manager) => {
            if (manager.lastname === localStorage.getItem("userManager")) {
                options.push(<option selected={true}>{manager.lastname + " " + manager.firstname}</option>);
            } else {
                options.push(<option>{manager.lastname + " " + manager.firstname}</option>);
            }
        })

        return (
            React.Children.toArray(options)
        )
    }

    async editUser() {
        const salaryInput = document.getElementById('salary');
        const salary = salaryInput.value;
        const requestSalary = {
            value: salary
        };

        const teamInput = document.getElementById('team');
        const team = teamInput.value;
        const requestTeam = {
            name: team
        };

        const managerInput = document.getElementById('manager');
        const manager = managerInput.value;
        let managerId;
        const managers = JSON.parse(localStorage.getItem("managers"));
        managers.map((currentManager) => {
           if ((currentManager.lastname + " " + currentManager.firstname) === manager) {
               managerId = currentManager.id;
           }
        });
        const requestManager = {
            id: managerId
        }

        let cache = [];
        if (salary && team && manager) {
            await fetch(`http://localhost:8080/users/${localStorage.getItem("userId")}/edit`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
                },
                body: JSON.stringify({salary: requestSalary, team: requestTeam, manager: requestManager},
                    function(key, value) {
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
                    <div className={"editManager"}>
                        <h3>Manager: </h3>
                        <select className="form-control" id={"manager"}>
                            {this.generateManagerSelector()}
                        </select>
                    </div>
                    <div className={"editEmployeeEditButton"}>
                        <button id={"editEmployeeEditButton"} type="button" className="btn btn-dark"
                                onClick={() => this.setState({isModal: true})}>
                            Edit</button>
                    </div>
                    <div className={"editEmployeeBackButton"}>
                        <NavLink to={"/employeeProfile"}>
                            <button id={"editEmployeeBackButton"} type="button" className="btn btn-dark">Back</button>
                        </NavLink>
                    </div>
                </div>
                <Modal show={this.state.isModal} onHide={() => this.setState({isModal: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Warning!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do you really want to edit employee's data?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.editUser}>
                            Yes
                        </Button>
                        <Button variant="secondary" onClick={() => this.setState({isModal: false})}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default EmployeeEdit;