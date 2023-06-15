import React, {Component} from "react";
import '../../../style/package/report/Report.css'
import {NavLink} from "react-router-dom";
import Header from "../../header/Header.jsx";
import JSPDF from "jspdf";

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
        fetch(`http://localhost:8080/packages/${localStorage.getItem("packageId")}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    package: data,
                    user: data.targetUser
                })
            }).catch(function (error) {
            console.log(error);
        })

        fetch(`http://localhost:8080/report/${localStorage.getItem("packageId")}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    report: data,
                    bestSkill: data.bestSkill,
                    worstSkill: data.worstSkill,
                    bestEmployee: data.bestFeedbackEmployee,
                    worstEmployee: data.worstFeedbackEmployee
                })
                localStorage.setItem("averageFeedbackMark", this.state.report.averageFeedbackMark
                    .toFixed(2));
                localStorage.setItem("bestAverageFeedbackMark", this.state.report.bestAverageFeedbackMark
                    .toFixed(2));
                localStorage.setItem("worstAverageFeedbackMark", this.state.report.worstAverageFeedbackMark
                    .toFixed(2));
            }).catch(function (error) {
            console.log(error);
        })
    }

    pdfGenerator = () => {
        const doc = new JSPDF('p', 'pt');
        const currentDate = new Date().toLocaleString('en', {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

        doc.line(0, 50, 1200, 50);

        doc.setFont('times', 'bold', 48);
        doc.text('PACKAGES`S REPORT', 225, 30);

        doc.setFont('courier', 'bold', 64);

        doc.text('Package: ' + this.state.package.name, 50, 100);
        doc.text('Employee: ' + this.state.user.lastname + ' ' + this.state.user.firstname, 50, 150);
        doc.text('Date: ' + currentDate, 250, 150);

        doc.text('Average mark for feedback:   ' + localStorage.getItem("averageFeedbackMark"), 50, 200);
        doc.text('Average mark of the best feedback:   ' + localStorage.getItem("bestAverageFeedbackMark"),
            50, 225);
        doc.text('Average mark of the worst feedback:   ' + localStorage.getItem("worstAverageFeedbackMark"),
            50, 250);
        doc.text('The best skill:   ' + this.state.bestSkill.name, 50, 275);
        doc.text('The worst skill:   ' + this.state.worstSkill.name, 50, 300);
        doc.text('The employee, who rated the best:   ' + this.state.bestEmployee.lastname, 50, 325);
        doc.text('The employee, who rated the worst:   ' + this.state.worstEmployee.lastname, 50, 350);
        doc.line(0, 375, 1200, 375);
        doc.text('Is the employee survey over?   ' + (this.state.report.allFeedbacksCompleted ? "Yes" : "No"),
            50, 400);

        doc.setFont('times', 'bold', 24);
        doc.text('Employee performance evaluation system', 50, 830);

        doc.line(0, 800, 1200, 800);

        doc.save(this.state.package.name + " report.pdf");
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
                        <h3 id={"averageFeedbackMarkValue"}>{localStorage.getItem("averageFeedbackMark")}</h3>
                    </div>
                    <div className={"bestAverageFeedbackMark"}>
                        <h4 id={"bestAverageFeedbackMarkLabel"}>Average mark of the best feedback: </h4>
                        <h3 id={"bestAverageFeedbackMarkValue"}>{localStorage.getItem("bestAverageFeedbackMark")}</h3>
                    </div>
                    <div className={"worstAverageFeedbackMark"}>
                        <h4 id={"worstAverageFeedbackMarkLabel"}>Average mark of the worst feedback: </h4>
                        <h3 id={"worstAverageFeedbackMarkValue"}>{localStorage.getItem("worstAverageFeedbackMark")}</h3>
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
                    <div className={"reportSaveToPDF"}>
                        <button id={"reportSaveToPDFButton"} type="button" className="btn btn-dark"
                                onClick={this.pdfGenerator}>Save to PDF</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Report;