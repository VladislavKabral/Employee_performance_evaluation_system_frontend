import React, {Component} from "react";
import '../../style/user/Profile.css';
import {NavLink} from "react-router-dom";

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            position: {},
            salary: {},
            team: {}
        }
    }

    componentDidMount() {
        let managerUserId;
        fetch(`http://localhost:8080/users/${localStorage.getItem("userId")}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    user: data,
                    position: data.position,
                    salary: data.salary,
                    team: data.team
                })
                managerUserId = data.manager.userId;
            }).catch(function (error) {
            console.log(error);
        })

        fetch(`http://localhost:8080/users/${managerUserId}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    managerName: data.lastname + " " + data.firstname
                })
                console.log(this.state.managerName);
            }).catch(function (error) {
            console.log(error);
        })
    }

    render() {
        return (
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
                        <h3>Managers</h3>
                        <hr/>
                    </div>
                    <div className={"userManager"}>
                        <label>Manager: </label>
                        <h3>{this.state.manager ? this.state.manager.name : "-"}</h3>
                        <hr/>
                    </div>
                    <div className={"userSalary"}>
                        <label>Salary: </label>
                        <h3>{this.state.salary.value + "$"}</h3>
                        <hr/>
                    </div>
                    <NavLink to={"/teams"}>
                        <button id={"userRequestButton"} type="button" className="btn btn-dark">Requests</button>
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default Profile;