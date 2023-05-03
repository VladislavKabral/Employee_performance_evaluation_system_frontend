import React, {Component} from "react";
import {NavLink} from "react-router-dom";

class Requests extends Component {

    constructor(props) {
        super(props);
        this.state = {
            requests: []
        }
    }

    componentDidMount() {
        fetch(`http://localhost:8080/feedbacks/user/${localStorage.getItem("userId")}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    requests: data
                })
                console.log(this.state.requests);
            }).catch(function (error) {
            console.log(error);
        })
    }

    processRequest(index, request) {
        return (
            <>
                <tr>
                    <td>{index}</td>
                    <td>
                        <NavLink className={"nav-link"} to={"/package"}>
                            {request.feedbackPackage.name}
                        </NavLink>
                    </td>
                    <td>
                        <NavLink className={"nav-link"} to={"/package"}>
                            {request.sourceUser.lastname + " " + request.sourceUser.firstname}
                        </NavLink>
                    </td>
                    <td>
                        <NavLink className={"nav-link"} to={"/package"}>
                            {request.date}
                        </NavLink>
                    </td>
                    <td>
                        <NavLink className={"nav-link"} to={"/package"}>
                            {request.status.name}
                        </NavLink>
                    </td>
                </tr>
            </>
        )
    }

    render() {
        const processedRequests = React.Children.toArray(this.state.requests.map((request) =>
            this.processRequest(this.state.requests.indexOf(request) + 1, request)));

        return (
            <div>
                <div className={"text"}>
                    <h2>Requests</h2>
                </div>
                <div className={"requestsTable"}>
                    <table className="table table-bordered table-dark">
                        <thead>
                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Package</th>
                            <th scope="col">Employee</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {processedRequests}
                        </tbody>
                    </table>
                </div>
                <div>
                    <NavLink to={"/profile"}>
                        <button id={"requestsBackButton"} type="button" className="btn btn-dark">Back</button>
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default Requests;