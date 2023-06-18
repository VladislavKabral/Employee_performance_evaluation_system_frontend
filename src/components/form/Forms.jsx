import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import Header from "../header/Header.jsx";

class Forms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forms: [],
            currentForms: [],
            currentPage: 0
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/forms', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    forms: data
                })
            }).catch(function (error) {
            console.log(error);
        })

        this.getCurrentForms(this.state.currentPage);
    }

    processForm(index, form) {
        return (
            <>
                <tr>
                    <td>{index}</td>
                    <td>
                        <NavLink className={"nav-link"} to={"/form"} onClick={() => localStorage.setItem("formId", form.id)}>
                            {form.name}
                        </NavLink>
                    </td>
                </tr>
            </>
        )
    }

    async getCurrentForms(pageNumber) {
        await fetch(`http://localhost:8080/forms/page/${pageNumber}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }
        }).then(response => response.json())
            .then(data => {
                this.setState({
                    currentForms: data
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
        const processedForms = React.Children.toArray(this.state.currentForms.map((form) =>
            this.processForm(this.state.currentForms.indexOf(form) + 1, form)));

        const countOfPages = Math.ceil(this.state.forms.length / 10);

        let tempLinks = [];
        for (let i = 1; i <= countOfPages; i++) {
            tempLinks.push(this.generatePageLink(i));
        }

        const pageLinks = React.Children.toArray(tempLinks);

        return (
            <div>
                <Header/>
                <div className={"forms"}>
                    <div className={"table"}>
                        <table className="table table-bordered table-dark">
                            <thead>
                            <tr>
                                <th scope="col">№</th>
                                <th scope="col">Name</th>
                            </tr>
                            </thead>
                            <tbody>
                            {processedForms}
                            </tbody>
                        </table>
                    </div>
                    <div className={"formsCreateNewFormPage"}>
                        <NavLink to={"/addForm"}>
                            <button id={"formsCreateNewFormButton"} type="button" className="btn btn-dark">Create new form</button>
                        </NavLink>
                    </div>
                    <div className={"formsPages"}>
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
                </div>
            </div>
        )
    }
}

export default Forms;