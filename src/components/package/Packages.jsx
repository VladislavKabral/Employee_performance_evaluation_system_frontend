import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import Header from "../header/Header.jsx";

class Packages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            packages: [],
            currentPackages: [],
            currentPage: 0
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/packages', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    packages: data
                })
            }).catch(function (error) {
            console.log(error);
        })

        this.getCurrentPackages(this.state.currentPage);
    }

    processPackage(index, feedbackPackage) {
        return (
            <>
                <tr>
                    <td>{index}</td>
                    <td>
                        <NavLink className={"nav-link"} to={"/package"} onClick={() => localStorage.setItem("packageId", feedbackPackage.id)}>
                            {feedbackPackage.name}
                        </NavLink>
                    </td>
                </tr>
            </>
        )
    }

    async getCurrentPackages(pageNumber) {
        await fetch(`http://localhost:8080/packages/page/${pageNumber}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }
        }).then(response => response.json())
            .then(data => {
                this.setState({
                    currentPackages: data
                })
            }).catch(function (error) {
                console.log(error);
            });
        this.componentDidMount();
    }

    generatePageLink(index) {
        return (
            <>
                <li className="page-item"><a className="page-link"
                                             onClick={() => this.setState({currentPage: index - 1})}>{index}</a></li>
            </>
        )
    }

    handleClickToPreviousPage = () => {
        const page = this.state.currentPage;

        if (page > 0) {
            this.setState({currentPage:  this.state.currentPage - 1})
        }
    }

    handleClickToNextPage = (pageCount) => {
        const page = this.state.currentPage;

        if (page < pageCount - 1) {
            this.setState({currentPage:  this.state.currentPage + 1})
        }
    }

    render() {
        const processedPackages = React.Children.toArray(this.state.currentPackages.map((feedbackPackage) =>
            this.processPackage(this.state.currentPackages.indexOf(feedbackPackage) + 1, feedbackPackage)));

        const countOfPages = Math.ceil(this.state.packages.length / 10);

        let tempLinks = [];
        for (let i = 1; i <= countOfPages; i++) {
            tempLinks.push(this.generatePageLink(i));
        }

        const pageLinks = React.Children.toArray(tempLinks);

        return (
            <div>
                <Header/>
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
                    <div className={"packagesPages"}>
                        <nav aria-label="Page navigation">
                            <ul className="pagination">
                                <li className="page-item"><a className="page-link"
                                                             onClick={() => this.handleClickToPreviousPage()}>
                                    Previous</a></li>
                                {pageLinks}
                                <li className="page-item"><a className="page-link"
                                                             onClick={() => this.handleClickToNextPage(countOfPages)}>
                                    Next</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className={"button"}>
                        <NavLink to={"/addPackage"}>
                            <button id={"packagesCreateNewPackageButton"} type="button" className="btn btn-dark">Create new package</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

export default Packages;