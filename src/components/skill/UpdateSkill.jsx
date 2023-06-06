import {Component} from "react";
import {NavLink} from "react-router-dom";
import '../../style/skill/Skill.css';
import Header from "../header/Header.jsx";

class UpdateSkill extends Component {

    constructor(props) {
        super(props);
    }

    async updateSkill() {
        const nameInput = document.getElementById('skillNameInput');
        const descriptionInput = document.getElementById('skillDescriptionInput');
        const name = nameInput.value;
        const description = descriptionInput.value;


        let cache = [];
        if (name && description) {
            await fetch(`http://localhost:8080/skills/${localStorage.getItem("skillId")}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
                },
                body: JSON.stringify({name: name, description: description}, function(key, value) {
                    if (typeof value === 'object' && value !== null) {
                        if (cache.indexOf(value) !== -1) {
                            return;
                        }
                        cache.push(value);
                    }
                    return value;
                })
            });
            nameInput.value = '';
            descriptionInput.value = '';
            window.location.assign("/skills");
        }
    }
    render() {
        return (
            <div>
                <Header/>
                <div className={"text"}>
                    <h1>Updating skill</h1>
                </div>
                <div className={"skillNameField"}>
                    <input id={"skillNameInput"} type="text" className="form-control" placeholder="Skill name"
                           aria-label="Skill name" defaultValue={localStorage.getItem("name")}/>
                </div>
                <div className={"skillDescriptionField"}>
                    <textarea id={"skillDescriptionInput"} placeholder="Skill description" className="form-control"
                              rows="5" defaultValue={localStorage.getItem("description")}></textarea>
                </div>
                <div className={"updateSkillUpdateButton"}>
                    <button id={"updateSkillUpdateButton"} type="button" className="btn btn-dark" onClick={this.updateSkill}>Update</button>
                </div>
                <br/>
                <div className={"updateSkillBackButton"}>
                    <NavLink to={"/skills"}>
                        <button id={"updateSkillBackButton"} type="button" className="btn btn-dark">Back</button>
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default UpdateSkill;