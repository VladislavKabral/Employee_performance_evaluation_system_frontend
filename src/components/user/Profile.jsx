import React, {Component} from "react";
import '../../style/user/Profile.css';
import {NavLink} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Header from "../header/Header.jsx";

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            position: {},
            salary: {},
            team: {},
            manager: {},
            users: [],
            isModal: false
        }
    }

    componentDidMount() {
        fetch(`http://localhost:8080/users/${localStorage.getItem("currentUserId")}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    user: data,
                    position: data.position,
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
    }

    handleLogOut = () => {
        localStorage.setItem("jwtToken", null);
        localStorage.setItem("currentUserRole", null);
        localStorage.setItem("currentUserId", null);
        window.location.assign("/");
    }

    render() {
        return (
            <div>
                <Header/>
                <div className={"user"}>
                    <div className={"userFullName"}>
                        <img id={"userAvatar"} src={"./src/assets/emptyAvatar.jpg"} alt={"Avatar"}/>
                        <h2>{this.state.user.lastname}</h2>
                        <h2>{this.state.user.firstname}</h2>
                    </div>
                    <div className={"userInfo"}>
                        <div className={"userPosition"}>
                            <label>Position: </label>
                            <h3>{this.state.position.name}</h3>
                            <hr/>
                        </div>
                        <div className={"userEmail"}>
                            <label>Email: </label>
                            <h3>{this.state.user.email}</h3>
                            <hr/>
                        </div>
                        <div className={"userTeam"}>
                            <label>Team: </label>
                            <h3>{this.state.team ? this.state.team.name : "-"}</h3>
                            <hr/>
                        </div>
                        <div className={"userManager"}>
                            <label>Manager: </label>
                            <h3>{this.state.manager ? this.state.manager.lastname + " " + this.state.manager.firstname: "-"}</h3>
                            <hr/>
                        </div>
                        <div className={"userSalary"}>
                            <label>Salary: </label>
                            <h3>{this.state.salary.value + "$"}</h3>
                            <hr/>
                        </div>
                        <NavLink to={"/requests"}>
                            <button id={"userRequestButton"} type="button" className="btn btn-dark">Requests</button>
                        </NavLink>
                        <button id={"logOutButton"} type="button" className="btn btn-dark"
                                onClick={() => this.setState({isModal: true})}>Log out</button>
                    </div>
                    <Modal show={this.state.isModal} onHide={() => this.setState({isModal: false})}>
                        <Modal.Header closeButton>
                            <Modal.Title>Warning!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Do you really want to quit from the system?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.handleLogOut()}>
                                Yes
                            </Button>
                            <Button variant="secondary" onClick={() => this.setState({isModal: false})}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Profile;