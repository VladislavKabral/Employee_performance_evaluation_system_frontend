import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import packages from "../package/Packages.jsx";

class Requests extends Component {

    constructor(props) {
        super(props);
        this.state = {
            requests: [],
            packages: []
        }
    }

    componentDidMount() {
         fetch(`http://localhost:8080/feedbacks/user/${localStorage.getItem("userId")}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    requests: data
                })
                this.state.requests.forEach((request) => {
                    fetch(`http://localhost:8080/packages/${request.feedbackPackage.id}`)
                        .then(response => response.json())
                        .then(data => {
                            this.state.packages.push(data);
                        }).catch(function (error) {
                        console.log(error);
                    })
                });
            }).catch(function (error) {
            console.log(error);
        })
    }

    processRequest(index, request, packages) {
        // console.log(packages);
        // console.log(packages.length);

        let link = request.status.name === "COMPLETED" ? '/feedback' : "/completeFeedback";

        return (
            <>
                <tr>
                    <td>{index}</td>
                    <td>
                        <NavLink className={"nav-link"} to={link}>
                            {request.feedbackPackage.name}
                        </NavLink>
                    </td>
                    <td>
                        <NavLink className={"nav-link"} to={link}>
                            {request.sourceUser.lastname + " " + request.sourceUser.firstname}
                        </NavLink>
                    </td>
                    <td>
                        <NavLink className={"nav-link"} to={link}>
                            {request.date}
                        </NavLink>
                    </td>
                    <td>
                        <NavLink className={"nav-link"} to={link}>
                            {request.status.name}
                        </NavLink>
                    </td>
                </tr>
            </>
        )
    }

    render() {
        const processedRequests = React.Children.toArray(this.state.requests.map((request) =>
            this.processRequest(this.state.requests.indexOf(request) + 1, request, this.state.packages)));

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