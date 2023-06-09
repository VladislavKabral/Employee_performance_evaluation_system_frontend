import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Header from "../header/Header.jsx";

class Skill extends Component {

    constructor(props) {
        super(props);
        this.state = {
            skill: {},
            isModal: false
        }
    }

    componentDidMount() {
        fetch(`http://localhost:8080/skills/${localStorage.getItem("skillId")}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    skill: data
                })
            }).catch(function (error) {
            console.log(error);
        })
    }

    async deleteSkill(skillId) {
        await fetch(`http://localhost:8080/skills/${skillId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }
        });

        this.handleClose();
        window.location.assign("/skills");
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
        localStorage.setItem("skillId", this.state.skill.id);
        localStorage.setItem("name", this.state.skill.name);
        localStorage.setItem("description", this.state.skill.description);
    }

    render() {
        return (
            <div>
                <Header/>
                <div className={"text"}>
                    <h1>Skill</h1>

                    <div className={"name"}>
                        <label>Name: </label>
                        <input id={"skillNameInput"} type="text" className="form-control" placeholder="Skill name"
                                   aria-label="Skill name" defaultValue={this.state.skill.name} readOnly={true}/>
                    </div>

                    <div className={"description"}>
                        <label>Description: </label>
                        <textarea id={"skillDescriptionInput"} placeholder="Skill description" className="form-control"
                                  rows="5" defaultValue={this.state.skill.description} readOnly={true}></textarea>
                    </div>

                    <div className={"button"}>
                        <NavLink to={"/updateSkill"} onClick={this.handleUpdateWindowOpen}>
                            <button id={"skillUpdateButton"} type="button" className="btn btn-dark">Update skill</button>
                        </NavLink>
                    </div>
                    <br/>
                    <div className={"button"}>
                        <button id={"skillDeleteButton"} type="button" className="btn btn-dark" onClick={this.handleOpen}>Delete</button>
                    </div>
                    <Modal show={this.state.isModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Warning!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Do you really want to delete the skill?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => this.deleteSkill(this.state.skill.id)}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <br/>
                    <div className={"button"}>
                        <NavLink to={"/skills"}>
                            <button id={"skillBackButton"} type="button" className="btn btn-dark">Back</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

export default Skill;