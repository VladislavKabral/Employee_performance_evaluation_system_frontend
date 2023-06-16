import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import Header from "../header/Header.jsx";

class UserFeedbacks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            feedbacks: [],
            packages: []
        }
    }

    componentDidMount() {
        fetch(`http://localhost:8080/feedbacks/${localStorage.getItem("currentUserId")}/feedbacks`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    feedbacks: data
                })
                this.state.feedbacks.forEach((request) => {
                    fetch(`http://localhost:8080/packages/${request.feedbackPackage.id}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            this.state.packages.push(data);
                            localStorage.setItem(`request${request.id}`, JSON.stringify(data));
                        }).catch(function (error) {
                        console.log(error);
                    })
                });
            }).catch(function (error) {
            console.log(error);
        })
        localStorage.setItem("isFeedback", "Yes")
    }

    processRequest(index, request) {
        let link = request.status.name === "COMPLETED" ? '/feedback' : "/completeFeedback";

        return (
            <>
                <tr>
                    <td>{index}</td>
                    <td>
                        <NavLink className={"nav-link"} to={link}
                                 onClick={() => localStorage.setItem("requestId", request.id)}>
                            {request.feedbackPackage.name}
                        </NavLink>
                    </td>
                    <td>
                        <NavLink className={"nav-link"} to={link}
                                 onClick={() => localStorage.setItem("requestId", request.id)}>
                            {request.sourceUser.lastname + " " + request.sourceUser.firstname}
                        </NavLink>
                    </td>
                    <td>
                        <NavLink className={"nav-link"} to={link}
                                 onClick={() => localStorage.setItem("requestId", request.id)}>
                            {request.date}
                        </NavLink>
                    </td>
                    <td>
                        <NavLink className={"nav-link"} to={link}
                                 onClick={() => localStorage.setItem("requestId", request.id)}>
                            {request.status.name}
                        </NavLink>
                    </td>
                </tr>
            </>
        )
    }

    render() {
        const processedRequests = React.Children.toArray(this.state.feedbacks.map((request) =>
            this.processRequest(this.state.feedbacks.indexOf(request) + 1, request)));

        return (
            <div>
                <Header/>
                <div className={"text"}>
                    <h2>Feedbacks</h2>
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

export default UserFeedbacks;