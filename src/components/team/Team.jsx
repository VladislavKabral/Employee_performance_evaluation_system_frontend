import React, {Component} from "react";
import '../../style/team/Team.css'
import {NavLink} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Header from "../header/Header.jsx";

class Team extends Component {

    constructor(props) {
        super(props);
        this.state = {
            team: {},
            users: [],
            isModal: false
        }
    }

    componentDidMount() {
        fetch(`http://localhost:8080/teams/${localStorage.getItem("teamId")}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    team: data,
                    users: data.users,
                    managerFullName: ""
                })
            }).catch(function (error) {
            console.log(error);
        })
    }

    processUsers(index, user) {
        let userFullName = user.lastname + ' ' + user.firstname;
        return (
            <>
                <tr>
                    <td>{index}</td>
                    <td>
                        <NavLink className={"nav-link"} to={"/employeeProfile"} onClick={() => this.handleOpenProfileWindow(user)}>
                            {userFullName}
                        </NavLink>
                    </td>
                </tr>
            </>
        )
    }

    async deleteTeam(teamId) {
        await fetch(`http://localhost:8080/teams/${teamId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }
        });

        this.handleClose();
        window.location.assign("/teams");
    }

    handleClose = () => {
        this.setState({
            isModal: false
        })
    };

    handleOpen = () => {
        this.setState({
            isModal: true
        })
    };

    handleOpenUpdateWindow = () => {
        localStorage.setItem("name", this.state.team.name);
        localStorage.setItem("teamId", this.state.team.id);
    }

    handleOpenProfileWindow = (user) => {
        localStorage.setItem("userId", user.id);
        localStorage.setItem("managerFullName", "managerFullName");
    }

    render() {
        const processedUsers = React.Children.toArray(this.state.users.map((user) =>
            this.processUsers(this.state.users.indexOf(user) + 1, user)));

        return (
            <div>
                <Header/>
                <div className={"text"}>
                    <h1>{this.state.team.name}</h1>

                    <table className="table table-bordered table-dark">
                        <thead>
                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Employee</th>
                        </tr>
                        </thead>
                        <tbody>
                            {processedUsers}
                        </tbody>
                    </table>

                    <div className={"button"}>
                        <NavLink to={"/updateTeam"} onClick={this.handleOpenUpdateWindow}>
                            <button id={"teamUpdateButton"} type="button" className="btn btn-dark">Update team</button>
                        </NavLink>
                    </div>
                    <br/>
                    <div className={"button"}>
                        <button id={"teamDeleteButton"} type="button" className="btn btn-dark" onClick={this.handleOpen}>Delete</button>
                    </div>
                    <Modal show={this.state.isModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Warning!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Do you really want to delete the team?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => this.deleteTeam(this.state.team.id)}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <br/>
                    <div className={"teamStatisticButton"}>
                        <NavLink to={"/teamStatistic"}>
                            <button id={"teamStatisticButton"} type="button" className="btn btn-dark">Statistic</button>
                        </NavLink>
                    </div>
                    <div className={"button"}>
                        <NavLink to={"/teams"}>
                            <button id={"teamBackButton"} type="button" className="btn btn-dark">Back</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

export default Team;