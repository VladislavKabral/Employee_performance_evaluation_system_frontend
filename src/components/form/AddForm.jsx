import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import '../../style/form/Form.css'

class AddForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questionFormCount: 1,
            questionBodies: [],
            skills: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/skills')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    skills: data
                })
            }).catch(function (error) {
            console.log(error);
        })
    }

    async createForm(questionCount) {
        const nameInput = document.getElementById('formNameInput');
        const name = nameInput.value;
        let questions = [];

        for (let i = 0; i < questionCount; i++) {
            let question = {
                text: "",
                skill: {
                    name: ""
                }
            }
            question.text = document.getElementById(`${i}`).value;
            question.skill.name = document.getElementById(`skill${i}`).value;
            questions.push(question);
        }

        let cache = [];
        if (name && questions) {
            await fetch('http://localhost:8080/forms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({name: name, questions: questions}, function(key, value) {
                    if (typeof value === 'object' && value !== null) {
                        if (cache.indexOf(value) !== -1) {
                            return;
                        }
                        cache.push(value);
                    }
                    return value;
                })
            })
            nameInput.value = '';
            window.location.assign("/forms");
        }
    }

    handleAddQuestion = () => {
        this.setState({
            questionBodies: []
        })

        for (let i = 0; i < this.state.questionFormCount; i++) {
            let input = document.getElementById(`${i}`);
            this.state.questionBodies.push(input.value);
        }

        this.setState({
            questionFormCount: this.state.questionFormCount + 1
        });
    }

    handleDeleteField = (index) => {
        this.setState({
            questionBodies: []
        })

        for (let i = 0; i < this.state.questionFormCount; i++) {
            let input = document.getElementById(`${i}`);
            this.state.questionBodies.push(input.value);
        }

        this.state.questionBodies.splice(index, 1);

        this.setState({
            questionFormCount: this.state.questionFormCount - 1
        });

        for (let i = 0; i < this.state.questionFormCount; i++) {
            document.getElementById(`${i}`).value = this.state.questionBodies[i];
        }
    }

    generateSkillSelector() {
        let options = [];
        this.state.skills.map((skill) => {
            options.push(<option>{skill.name}</option>);
        })

        return (
            React.Children.toArray(options)
        )
    }

    generateQuestionInput(index) {
        return (
            <div className={"questionField"}>
                <textarea id={index} placeholder="Question body" className="form-control"
                          rows="3" value={this.state.questionBodies[index]}></textarea>
                <select className="form-control" id={"skill"+index}>
                    {this.generateSkillSelector()}
                </select>
                <div className={"deleteField"}>
                    <img id={"img"+index} src={"./src/assets/buttonBackground.png"} alt={"Delete"}
                         onClick={() => this.handleDeleteField(index)}/>
                </div>
            </div>
        )
    }

    generateQuestionInputs() {
        let inputs = [];
        for (let i = 0; i < this.state.questionFormCount; i++) {
            inputs.push(this.generateQuestionInput(i));
        }

        return (
            <div>
                {React.Children.toArray(inputs)}
            </div>
        )
    }

    render() {
        const inputs = React.Children.toArray(this.generateQuestionInputs());

        return (
            <div>
                <div className={"text"}>
                    <h1>Creation new form</h1>
                </div>
                <div className={"formNameField"}>
                    <input id={"formNameInput"} type="text" className="form-control" placeholder="Form name"
                           aria-label="Form name"/>
                </div>
                <div className={"questionsFields"}>
                    {inputs}
                </div>
                <div className={"button"}>
                    <button id={"addFormAddQuestionButton"} type="button" className="btn btn-dark" onClick={this.handleAddQuestion}>Add question</button>
                </div>
                <div className={"button"}>
                    <button id={"addFormCreateButton"} type="button" className="btn btn-dark" onClick={() => this.createForm(this.state.questionFormCount)}>
                        Create form</button>
                </div>
                <div className={"button"}>
                    <NavLink to={"/forms"}>
                        <button id={"addFormBackButton"} type="button" className="btn btn-dark">Back</button>
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default AddForm;