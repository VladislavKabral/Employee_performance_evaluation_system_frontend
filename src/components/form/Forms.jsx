import React, {Component} from "react";
import {NavLink} from "react-router-dom";

class Forms extends Component {

    constructor(props) {
        super(props);
        this.state = {
            forms: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/forms')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    forms: data
                })
            }).catch(function (error) {
            console.log(error);
        })
    }

    processForm(index, form) {
        return (
            <>
                <tr>
                    <td>{index}</td>
                    <td>
                        <NavLink to={"/form"} onClick={() => localStorage.setItem("formId", form.id)}>
                            {form.name}
                        </NavLink>
                    </td>
                </tr>
            </>
        )
    }
    render() {
        const processedForms = React.Children.toArray(this.state.forms.map((form) =>
            this.processForm(this.state.forms.indexOf(form) + 1, form)));

        return (
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
                <div className={"button"}>
                    <NavLink to={"/addForm"}>
                        <button type="button" className="btn btn-dark">Create new form</button>
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default Forms;