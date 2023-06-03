import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Header from "../header/Header.jsx";

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {},
            questions: [],
            isModal: false
        }
    }

    componentDidMount() {
        fetch(`http://localhost:8080/forms/${localStorage.getItem("formId")}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    form: data,
                    questions: data.questions
                })
                console.log(this.state.questions);
            }).catch(function (error) {
            console.log(error);
        })
    }

    async deleteForm(formId) {
        await fetch(`http://localhost:8080/forms/${formId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }
        });

        this.handleClose();
        window.location.assign("/forms");
    }

    handleClose = () => {
        this.setState({
            isModal: false
        })
    };

    handleOpen = () => {
        this.setState({
            isModal: true
        })
    };

    handleUpdateWindowOpen = () => {
        localStorage.setItem("form", JSON.stringify(this.state.form));
    }

    processQuestion(index, question) {
        return (
            <>
                <tr>
                    <td>{index}</td>
                    <td><textarea id={"questionField"} placeholder="Question text" className="form-control"
                                  rows="2" defaultValue={question.text} readOnly={true}></textarea></td>

                </tr>
            </>
        )
    }

    render() {
        const processedQuestions = React.Children.toArray(this.state.questions.map((question) =>
            this.processQuestion(this.state.questions.indexOf(question) + 1, question)));

        return (
            <div>
                <Header/>
                <div className={"text"}>
                    <h1>{this.state.form.name}</h1>

                    <table className="table table-bordered table-light">
                        <thead>
                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Question</th>
                        </tr>
                        </thead>
                        <tbody>
                        {processedQuestions}
                        </tbody>
                    </table>

                    <div className={"button"}>
                        <NavLink to={"/updateForm"} onClick={this.handleUpdateWindowOpen}>
                            <button id={"formUpdateButton"} type="button" className="btn btn-dark" onClick={this.handleUpdateWindowOpen}>Update form</button>
                        </NavLink>
                    </div>
                    <br/>
                    <div className={"button"}>
                        <button id={"formDeleteButton"} type="button" className="btn btn-dark" onClick={this.handleOpen}>Delete</button>
                    </div>
                    <Modal show={this.state.isModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Warning!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Do you really want to delete the form?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => this.deleteForm(this.state.form.id)}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <br/>
                    <div className={"button"}>
                        <NavLink to={"/forms"}>
                            <button id={"formBackButton"} type="button" className="btn btn-dark">Back</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

export default Form;