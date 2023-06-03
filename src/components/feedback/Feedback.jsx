import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import Header from "../header/Header.jsx";

class Feedback extends Component {

    constructor(props) {
        super(props);
        this.state = {
            feedback: {},
            responses: [],
            form: {},
            questions: []
        }
    }

    componentDidMount() {
        fetch(`http://localhost:8080/feedbacks/${localStorage.getItem("requestId")}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    feedback: data,
                    responses: data.responses
                })
            }).catch(function (error) {
            console.log(error);
        })

        const requestId = localStorage.getItem("requestId");
        const feedbackPackage = JSON.parse(localStorage.getItem(`request${requestId}`));
        const formId = feedbackPackage.form.id;

        fetch(`http://localhost:8080/forms/${formId}`, {
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
            }).catch(function (error) {
            console.log(error);
        })
    }

    generateField(index, question, response) {
        return (
            <div className={"answer"}>
                <textarea id={"questionText"+index} placeholder="Question text" className="form-control"
                          rows="1" defaultValue={question.text} readOnly={true}></textarea>
                <textarea id={`answer${index}`} placeholder="Answer text" className="form-control"
                          rows="1" defaultValue={response.text} readOnly={true}></textarea>
            </div>
        )
    }

    render() {
        this.componentDidMount();
        const generatedFields = React.Children.toArray(this.state.questions.map((question) =>
            this.generateField(this.state.questions.indexOf(question), question,
                this.state.responses[this.state.questions.indexOf(question)])));

        return (
            <div>
                <Header/>
                <div className={"text"}>
                    <h2>{this.state.form.name}</h2>
                </div>
                <div className={"formContent"}>
                    {generatedFields}
                </div>
                <div className={"feedbackBackButton"}>
                    <NavLink to={"/requests"}>
                        <button id={"feedbackBackButton"} type="button" className="btn btn-dark">Back</button>
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default Feedback;