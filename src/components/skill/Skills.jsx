import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import Header from "../header/Header.jsx";

class Skills extends Component {

    constructor(props) {
        super(props);
        this.state = {
            skills: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/skills', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    skills: data
                })
            }).catch(function (error) {
            console.log(error);
        })
    }

    processSkill(index, skill) {
        return (
            <>
                <tr>
                    <td>{index}</td>
                    <td>
                        <NavLink className={"nav-link"} to={"/skill"} onClick={() => localStorage.setItem("skillId", skill.id)}>
                            {skill.name}
                        </NavLink>
                    </td>
                    <td>
                        {skill.description}
                    </td>
                </tr>
            </>
        )
    }
    render() {
        const processedSkills = React.Children.toArray(this.state.skills.map((skill) =>
            this.processSkill(this.state.skills.indexOf(skill) + 1, skill)));

        return (
            <div>
                <Header/>
                <div className={"skills"}>
                    <div className={"table"}>
                        <table className="table table-bordered table-dark">
                            <thead>
                            <tr>
                                <th scope="col">№</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                            </tr>
                            </thead>
                            <tbody>
                            {processedSkills}
                            </tbody>
                        </table>
                    </div>
                    <div className={"button"}>
                        <NavLink to={"/addSkill"}>
                            <button id={"skillsCreateNewSkillButton"} type="button" className="btn btn-dark">Create new skill</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

export default Skills;