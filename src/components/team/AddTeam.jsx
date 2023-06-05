import '../../style/team/Team.css'
import {NavLink} from "react-router-dom";
import React, {Component} from "react";
import Header from "../header/Header.jsx";
class AddTeam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/users', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    users: data
                })
            }).catch(function (error) {
            console.log(error);
        })
    }

    async createTeam(users) {
        const input = document.getElementById('teamNameInput');
        const name = input.value;
        let chosenUsers = [];

        users.forEach((user) => {
            const userCheckbox = document.getElementById(user.id);
            if (userCheckbox.checked) {
                chosenUsers.push(user);
            }
        });

        let cache = [];
        if (name) {
            await fetch('http://localhost:8080/teams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
                },
                body: JSON.stringify({name: name, users: chosenUsers}, function(key, value) {
                    if (typeof value === 'object' && value !== null) {
                        if (cache.indexOf(value) !== -1) {
                            return;
                        }
                        cache.push(value);
                    }
                    return value;
                })
            });
            input.value = '';
            window.location.assign("/teams");
        }
    }

    processUsers(index, user) {
        let userFullName = user.lastname + ' ' + user.firstname;

        return (
            <>
                <tr>
                    <td>{index}</td>
                    <td>
                        <NavLink className={"nav-link"} to={"/employeeProfile"} onClick={() => localStorage.setItem("userId", user.id)}>
                            {userFullName}
                        </NavLink>
                    </td>
                    <td>
                        <input className="form-check-input" type="checkbox" value="" id={user.id}/>
                    </td>
                </tr>
            </>
        )
    }

    render() {
        const processedUsers = React.Children.toArray(this.state.users.map((user) =>
            this.processUsers(this.state.users.indexOf(user) + 1, user)));

        return (
            <div>
                <Header/>
                <div className={"text"}>
                    <h1>Creation new team</h1>
                </div>
                <div className={"teamNameField"}>
                    <input id={"teamNameInput"} type="text" className="form-control" placeholder="Team name" aria-label="Team name"/>
                </div>
                <div className={"employees"}>
                    <table className="table table-bordered table-dark">
                        <thead>
                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Name</th>
                            <th scope="col">Choose</th>
                        </tr>
                        </thead>
                        <tbody>
                            {processedUsers}
                        </tbody>
                    </table>
                </div>
                <div className={"button"}>
                    <button id={"addTeamCreateButton"} type="button" className="btn btn-dark"
                            onClick={() => this.createTeam(this.state.users)}>Create</button>
                </div>
                <br/>
                <div className={"button"}>
                    <NavLink to={"/teams"}>
                        <button id={"addTeamBackButton"} type="button" className="btn btn-dark">Back</button>
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default AddTeam;