import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import Header from "../../header/Header.jsx";

class ManagerEmployees extends Component {

    constructor(props) {
        super(props);
        this.state = {
            manager: {},
            users: []
        }
    }

    componentDidMount() {
        fetch(`http://localhost:8080/users/manager/${localStorage.getItem("currentUserId")}/users`, {
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

    handleOpenProfileWindow = (user) => {
        localStorage.setItem("userId", user.id);
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

    render() {
        const processedUsers = React.Children.toArray(this.state.users.map((user) =>
            this.processUsers(this.state.users.indexOf(user) + 1, user)));

        return (
            <div>
                <Header/>
                <div className={"employees"}>
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
                </div>
            </div>
        )
    }
}

export default ManagerEmployees;