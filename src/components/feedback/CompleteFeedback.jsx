import React, {Component} from "react";
import '../../style/feedback/Feedback.css'
import {NavLink} from "react-router-dom";

class CompleteFeedback extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {},
            questions: []
        }
    }

    componentDidMount() {
        const requestId = localStorage.getItem("requestId");
        const feedbackPackage = JSON.parse(localStorage.getItem(`request${requestId}`));
        const formId = feedbackPackage.form.id;

        fetch(`http://localhost:8080/forms/${formId}`)
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

    async createFeedback() {
        let responses = [];
        let length = this.state.questions.length;

        for (let i = 0; i < length; i++) {
            let response = {
                text: "",
                rate: "",
                question: {
                    text: ""
                }
            }
            response.text = document.getElementById(`answer${i}`).value;
            response.rate = document.getElementById(`rate${i}`).value;
            response.question.text = document.getElementById(`questionText${i}`).value;
            responses.push(response);
        }

        console.log(responses);

        let cache = [];
        if (responses) {
            await fetch(`http://localhost:8080/feedbacks/${localStorage.getItem("requestId")}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({responses: responses}, function(key, value) {
                    if (typeof value === 'object' && value !== null) {
                        if (cache.indexOf(value) !== -1) {
                            return;
                        }
                        cache.push(value);
                    }
                    return value;
                })
            })
            window.location.assign("/requests");
        }
    }

    generateAnswerField(index, question) {
        return (
            <div className={"answer"}>
                <textarea id={"questionText"+index} placeholder="Question text" className="form-control"
                          rows="1" defaultValue={question.text} readOnly={true}></textarea>
                <textarea id={`answer${index}`} placeholder="Answer text" className="form-control"
                          rows="1"></textarea>
                <div className={"rateContent"}>
                    <div className={"rateLabel"}>
                        <h3>Rate: </h3>
                    </div>
                    <div className={"rateSelect"}>
                        <select className="form-control" id={"rate"+index}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                        </select>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const generatedAnswerFields = React.Children.toArray(this.state.questions.map((question) =>
            this.generateAnswerField(this.state.questions.indexOf(question), question)));

        return (
            <div>
                <div className={"text"}>
                    <h2>{this.state.form.name}</h2>
                </div>
                <div className={"formContent"}>
                    {generatedAnswerFields}
                </div>
                <div className={"completeFeedbackSendButton"}>
                    <button id={"completeFeedbackSendButton"} type="button" className="btn btn-dark" onClick={() => this.createFeedback()}>
                        Send</button>
                </div>
                <div className={"completeFeedbackBackButton"}>
                    <NavLink to={"/requests"}>
                        <button id={"completeFeedbackBackButton"} type="button" className="btn btn-dark">Back</button>
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default CompleteFeedback;