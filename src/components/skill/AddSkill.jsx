import {Component} from "react";
import {NavLink} from "react-router-dom";
import '../../style/skill/Skill.css';

class AddSkill extends Component {

    constructor(props) {
        super(props);
    }

    async createSkill() {
        const nameInput = document.getElementById('skillNameInput');
        const descriptionInput = document.getElementById('skillDescriptionInput');
        const name = nameInput.value;
        const description = descriptionInput.value;


        let cache = [];
        if (name && description) {
            await fetch('http://localhost:8080/skills', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
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
                <div className={"text"}>
                    <h1>Creation new skill</h1>
                </div>
                <div className={"skillNameField"}>
                    <input id={"skillNameInput"} type="text" className="form-control" placeholder="Skill name" aria-label="Skill name"/>
                </div>
                <div className={"skillDescriptionField"}>
                    <textarea id={"skillDescriptionInput"} placeholder="Skill description" className="form-control" rows="5"></textarea>
                </div>
                <div className={"button"}>
                    <button type="button" className="btn btn-dark" onClick={this.createSkill}>Create</button>
                </div>
                <br/>
                <div className={"button"}>
                    <NavLink to={"/skills"}>
                        <button type="button" className="btn btn-dark">Back</button>
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default AddSkill;