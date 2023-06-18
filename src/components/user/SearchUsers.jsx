import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import '../../style/user/Profile.css';
import Header from "../header/Header.jsx";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class SearchUsers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isModal: false
        }
    }

    async searchEmployee() {
        const lastnameInput = document.getElementById('employeeLastnameInput');
        const lastname = lastnameInput.value;

        let cache = [];
        if (lastname) {
            await fetch('http://localhost:8080/users/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
                },
                body: JSON.stringify({lastname: lastname}, function(key, value) {
                    if (typeof value === 'object' && value !== null) {
                        if (cache.indexOf(value) !== -1) {
                            return;
                        }
                        cache.push(value);
                    }
                    return value;
                })
            }).then(response => response.json())
                .then(data => {
                    this.setState({
                        users: data
                    })
                    if (data.length === 0) {
                        this.setState({isModal: true});
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        }
    }

    processUsers(index, user) {
        let userFullName = user.lastname + ' ' + user.firstname;
        return (
            <>
                <tr>
                    <td>{index}</td>
                    <td>
                        <NavLink className={"nav-link"} to={"/employeeProfile"} onClick={() =>
                            localStorage.setItem("userId", user.id)}>
                            {userFullName}
                        </NavLink>
                    </td>
                </tr>
            </>
        )
    }

    render() {
        let processedUsers;
        if (this.state.users.length !== 0) {
            processedUsers = React.Children.toArray(this.state.users.map((user) =>
                this.processUsers(this.state.users.indexOf(user) + 1, user)));
        }

        return (
            <div>
                <Header/>
                <div className={"text"}>
                    <h1>Searching employees</h1>
                </div>
                <div className={"search"}>
                    <input id={"employeeLastnameInput"} type="text" className="form-control"
                           placeholder="Employee's lastname" aria-label="Employee's lastname"/>
                    <button id={"searchEmployeeButton"} type="button" className="btn btn-dark"
                            onClick={() => this.searchEmployee()}>Search</button>
                </div>
                <div className={"searchedEmployees"}>
                    {(processedUsers) &&
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
                    }
                </div>
                <Modal show={this.state.isModal} onHide={() => this.setState({isModal: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Warning!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Employees with this lastname haven't been found.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({isModal: false})}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default SearchUsers;