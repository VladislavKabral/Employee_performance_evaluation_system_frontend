import React, {Component} from "react";
import '../../../style/package/report/Report.css'
import {NavLink} from "react-router-dom";
import Header from "../../header/Header.jsx";

class Report extends Component {

    constructor(props) {
        super(props);
        this.state = {
            package: {},
            user: {},
            report: {},
            bestSkill: {},
            worstSkill: {},
            bestEmployee: {},
            worstEmployee: {}
        }
    }

    componentDidMount() {
        fetch(`http://localhost:8080/packages/${localStorage.getItem("packageId")}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    package: data,
                    user: data.targetUser
                })
            }).catch(function (error) {
            console.log(error);
        })

        fetch(`http://localhost:8080/report/${localStorage.getItem("packageId")}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    report: data,
                    bestSkill: data.bestSkill,
                    worstSkill: data.worstSkill,
                    bestEmployee: data.bestFeedbackEmployee,
                    worstEmployee: data.worstFeedbackEmployee
                })
            }).catch(function (error) {
            console.log(error);
        })
    }

    render() {
        return(
            <div>
                <Header/>
                <div className={"report"}>
                    <div className={"reportPackage"}>
                        <h3 id={"reportPackageLabel"}>Package: </h3>
                        <h2 id={"reportPackageName"}>{this.state.package.name}</h2>
                    </div>
                    <div className={"reportEmployee"}>
                        <h3 id={"reportEmployeeLabel"}>Employee: </h3>
                        <h2 id={"reportEmployeeName"}>{this.state.user.lastname + " " +
                            this.state.user.firstname}</h2>
                    </div>
                    <hr/>
                    <div className={"averageFeedbackMark"}>
                        <h4 id={"averageFeedbackMarkLabel"}>Average mark for feedback: </h4>
                        <h3 id={"averageFeedbackMarkValue"}>{this.state.report.averageFeedbackMark}</h3>
                    </div>
                    <div className={"bestAverageFeedbackMark"}>
                        <h4 id={"bestAverageFeedbackMarkLabel"}>Average mark of the best feedback: </h4>
                        <h3 id={"bestAverageFeedbackMarkValue"}>{this.state.report.bestAverageFeedbackMark}</h3>
                    </div>
                    <div className={"worstAverageFeedbackMark"}>
                        <h4 id={"worstAverageFeedbackMarkLabel"}>Average mark of the worst feedback: </h4>
                        <h3 id={"worstAverageFeedbackMarkValue"}>{this.state.report.worstAverageFeedbackMark}</h3>
                    </div>
                    <div className={"bestSkill"}>
                        <h4 id={"bestSkillLabel"}>The best skill: </h4>
                        <h3 id={"bestSkillName"}>{this.state.bestSkill.name}</h3>
                    </div>
                    <div className={"worstSkill"}>
                        <h4 id={"worstSkillLabel"}>The worst skill: </h4>
                        <h3 id={"worstSkillName"}>{this.state.worstSkill.name}</h3>
                    </div>
                    <div className={"bestFeedbackEmployee"}>
                        <h4 id={"bestFeedbackEmployeeLabel"}>The employee, who rated the best: </h4>
                        <h3 id={"bestFeedbackEmployeeName"}>{this.state.bestEmployee.lastname}</h3>
                    </div>
                    <div className={"worstFeedbackEmployee"}>
                        <h4 id={"worstFeedbackEmployeeLabel"}>The employee, who rated the worst: </h4>
                        <h3 id={"worstFeedbackEmployeeName"}>{this.state.worstEmployee.lastname}</h3>
                    </div>
                    <hr id={"allFeedbacksCompletedDelimiter"}/>
                    <div className={"allFeedbacksCompleted"}>
                        <h4 id={"allFeedbacksCompletedLabel"}>Is the employee survey over? </h4>
                        <h3 id={"allFeedbacksCompletedName"}>{this.state.report.allFeedbacksCompleted ? "Yes" : "No"}</h3>
                    </div>
                    <div className={"reportBack"}>
                        <NavLink to={"/package"}>
                            <button id={"reportBackButton"} type="button" className="btn btn-dark"
                                    onClick={() => localStorage.setItem("packageId", this.state.package.id)}>Back</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

export default Report;