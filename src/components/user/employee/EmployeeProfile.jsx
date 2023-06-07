import React, {Component} from "react";
import '../../../style/user/Profile.css';
import {NavLink} from "react-router-dom";
import Header from "../../header/Header.jsx";

class EmployeeProfile extends Component {

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
        fetch(`http://localhost:8080/users/${localStorage.getItem("userId")}`, {
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
                        <NavLink to={"/employeeStatistic"}>
                            <button id={"employeeStatisticButton"} type="button" className="btn btn-dark">Statistic</button>
                        </NavLink>
                        {localStorage.getItem("currentUserRole") === "DIRECTOR" &&
                            <NavLink to={"/employeeEdit"}>
                                <button id={"employeeEditButton"} type="button" className="btn btn-dark">Edit</button>
                            </NavLink>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default EmployeeProfile;