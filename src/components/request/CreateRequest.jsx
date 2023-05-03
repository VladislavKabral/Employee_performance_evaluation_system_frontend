import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import '../../style/request/Request.css'

class CreateRequest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/users')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    users: data
                })
                console.log(this.state.users);
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
                        <NavLink className={"nav-link"} to={"/profile"} onClick={() => localStorage.setItem("userId", user.id)}>
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

    async createRequests(users) {
        let chosenUsers = [];

        users.forEach((user) => {
            const userCheckbox = document.getElementById(user.id);
            if (userCheckbox.checked) {
                chosenUsers.push(user);
            }
        });

        let cache = [];
        if (chosenUsers) {
            await fetch(`http://localhost:8080/packages/${localStorage.getItem("packageId")}/request`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({users: chosenUsers}, function(key, value) {
                    if (typeof value === 'object' && value !== null) {
                        if (cache.indexOf(value) !== -1) {
                            return;
                        }
                        cache.push(value);
                    }
                    return value;
                })
            });
            window.location.assign("/profile");
        }
    }

    render() {
        const processedUsers = React.Children.toArray(this.state.users.map((user) =>
            this.processUsers(this.state.users.indexOf(user) + 1, user)));

        return (
            <div>
                <div className={"text"}>
                    <h2>Creation requests for {localStorage.getItem("packageName")}</h2>
                </div>

                <div className={"requestUsers"}>
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
                    <button id={"createRequestSendRequestsButton"} type="button" className="btn btn-dark"
                            onClick={() => this.createRequests(this.state.users)}>Send requests</button>
                </div>
            </div>
        )
    }
}

export default CreateRequest;