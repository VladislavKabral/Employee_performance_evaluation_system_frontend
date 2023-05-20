import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class Package extends Component {
    constructor(props) {
        super(props);
        this.state = {
            package: {},
            form: {},
            user: {},
            isModal: false
        }
    }

    componentDidMount() {
        fetch(`http://localhost:8080/packages/${localStorage.getItem("packageId")}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    package: data,
                    form: data.form,
                    user: data.targetUser
                })
            }).catch(function (error) {
            console.log(error);
        })
    }

    async deletePackage(packageId) {
        await fetch(`http://localhost:8080/packages/${packageId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        this.handleClose();
        window.location.assign("/packages");
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
        localStorage.setItem("packageId", this.state.package.id);
        localStorage.setItem("formName", this.state.form.name);
        localStorage.setItem("userFullName", this.state.user.lastname + " " + this.state.user.firstname);
        localStorage.setItem("packageIsPublic", this.state.package.isPublic);
    }

    handleCreateRequestWindowOpen = () => {
        localStorage.setItem("packageName", this.state.package.name);
        localStorage.setItem("packageId", this.state.package.id);
    }
    render() {
        return (
            <div>
                <div className={"text"}>
                    <h1>Feedback package</h1>

                    <div className={"name"}>
                        <label>Name: </label>
                        <input id={"packageNameInput"} type="text" className="form-control" placeholder="Package name"
                               aria-label="Package name" defaultValue={this.state.package.name} readOnly={true}/>
                    </div>

                    <div className={"form"}>
                        <label>Form: </label>
                        <input id={"packageFormInput"} placeholder="Package form" className="form-control"
                               defaultValue={this.state.form.name} readOnly={true}></input>
                    </div>

                    <div className={"targetUser"}>
                        <label>Target user: </label>
                        <input id={"packageUserInput"} placeholder="Package user" className="form-control"
                               value={this.state.user.lastname + " " + this.state.user.firstname} readOnly={true}></input>
                    </div>

                    <div className={"button"}>
                        <NavLink to={"/updatePackage"} onClick={this.handleUpdateWindowOpen}>
                            <button id={"packageUpdateButton"} type="button" className="btn btn-dark">Update package</button>
                        </NavLink>
                    </div>
                    <br/>
                    <div className={"button"}>
                        <button id={"packageDeleteButton"} type="button" className="btn btn-dark" onClick={this.handleOpen}>Delete</button>
                    </div>
                    <Modal show={this.state.isModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Warning!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Do you really want to delete the package?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => this.deletePackage(this.state.package.id)}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <br/>
                    <div className={"button"}>
                        <NavLink to={"/packages"}>
                            <button id={"packageBackButton"} type="button" className="btn btn-dark">Back</button>
                        </NavLink>
                    </div>
                    <div className={"button"}>
                        <NavLink to={"/createRequest"}>
                            <button id={"packageCreateRequestButton"} type="button" className="btn btn-dark"
                                    onClick={this.handleCreateRequestWindowOpen}>Create request</button>
                        </NavLink>
                    </div>
                    <div className={"createReport"}>
                        <NavLink to={"/report"}>
                            <button id={"packageCreateReportButton"} type="button" className="btn btn-dark"
                                    onClick={() => localStorage.setItem("packageId", this.state.package.id)}>Create report</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

export default Package;