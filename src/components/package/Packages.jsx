import React, {Component} from "react";
import {NavLink} from "react-router-dom";

class Packages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            packages: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/packages')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    packages: data
                })
            }).catch(function (error) {
            console.log(error);
        })
    }

    processPackage(index, feedbackPackage) {
        return (
            <>
                <tr>
                    <td>{index}</td>
                    <td>
                        <NavLink to={"/package"} onClick={() => localStorage.setItem("packageId", feedbackPackage.id)}>
                            {feedbackPackage.name}
                        </NavLink>
                    </td>
                </tr>
            </>
        )
    }

    render() {
        const processedPackages = React.Children.toArray(this.state.packages.map((feedbackPackage) =>
            this.processPackage(this.state.packages.indexOf(feedbackPackage) + 1, feedbackPackage)));

        return (
            <div className={"packages"}>
                <div className={"table"}>
                    <table className="table table-bordered table-dark">
                        <thead>
                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Name</th>
                        </tr>
                        </thead>
                        <tbody>
                            {processedPackages}
                        </tbody>
                    </table>
                </div>
                <div className={"button"}>
                    <NavLink to={"/addPackage"}>
                        <button type="button" className="btn btn-dark">Create new package</button>
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default Packages;