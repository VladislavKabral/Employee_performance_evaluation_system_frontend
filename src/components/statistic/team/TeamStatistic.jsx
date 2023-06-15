import React, {Component} from "react";
import '../../../style/statistic/team/TeamStatistic.css'
import CanvasJSReact from '@canvasjs/react-charts';
import {NavLink} from "react-router-dom";
import Header from "../../header/Header.jsx";
import JSPDF from "jspdf";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
class TeamStatistic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            team: {},
            statistic: {},
            bestSkill: {},
            worstSkill: {},
            bestEmployee: {},
            worstEmployee: {},
            distributionOfMarks: []
        }
    }

    componentDidMount() {
        fetch(`http://localhost:8080/teams/${localStorage.getItem("teamId")}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    team: data
                })
            }).catch(function (error) {
            console.log(error);
        })

        fetch(`http://localhost:8080/teams/${localStorage.getItem("teamId")}/statistic`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("marks", JSON.stringify(data.distributionOfMarks));
                localStorage.setItem("averageFeedbackMark", data.averageFeedbackMark.toFixed(2))
                localStorage.setItem("bestAverageFeedbackMark", data.bestAverageFeedbackMark.toFixed(2))
                localStorage.setItem("worstAverageFeedbackMark", data.worstAverageFeedbackMark.toFixed(2));
                this.setState({
                    statistic: data,
                    bestSkill: data.bestSkill,
                    worstSkill: data.worstSkill,
                    bestEmployee: data.bestEmployee,
                    worstEmployee: data.worstEmployee,
                    distributionOfMarks: data.distributionOfMarks
                })
                console.log(this.state.statistic)
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
        doc.text('TEAM`S STATISTIC', 240, 30);

        doc.setFont('courier', 'bold', 64);

        doc.text('Team: ' + this.state.team.name, 50, 100);
        doc.text('Date: ' + currentDate, 250, 100);

        doc.text('Average mark for feedback:   ' + localStorage.getItem("averageFeedbackMark"), 50, 150);
        doc.text('Average mark of the best feedback:   ' + localStorage.getItem("bestAverageFeedbackMark"),
            50, 175);
        doc.text('Average mark of the worst feedback:   ' + localStorage.getItem("worstAverageFeedbackMark"),
            50, 200);
        doc.text('The best skill:   ' + this.state.bestSkill.name, 50, 225);
        doc.text('The worst skill:   ' + this.state.worstSkill.name, 50, 250);
        doc.text('The best employee:   ' + this.state.bestEmployee.lastname, 50, 275);
        doc.text('The worst employee:   ' + this.state.worstEmployee.lastname, 50, 300);

        doc.setFont('times', 'bold', 24);
        doc.text('Employee performance evaluation system', 50, 830);

        doc.line(0, 800, 1200, 800);

        doc.save(this.state.team.name + " statistic.pdf");
    }

    render() {
        const averageFeedbackMark = localStorage.getItem("averageFeedbackMark");
        const bestAverageFeedbackMark = localStorage.getItem("bestAverageFeedbackMark");
        const worstAverageFeedbackMark = localStorage.getItem("worstAverageFeedbackMark");
        const marks = JSON.parse(localStorage.getItem("marks"));
        let countOfMarks = 0;
        let percents = [];

        marks.map((mark) => {
            countOfMarks += mark;
        });

        marks.map((mark) => {
            percents.push((mark / countOfMarks) * 100);
        });

        const options = {
            theme: "dark2",
            height: 325,
            width: 500,
            animationEnabled: true,
            title: {
                text: "Distribution of marks"
            },
            data: [{
                type: "pie",
                startAngle: 75,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}%",
                dataPoints: [
                    { y: percents[0], label: "1" },
                    { y: percents[1], label: "2" },
                    { y: percents[2], label: "3" },
                    { y: percents[3], label: "4" },
                    { y: percents[4], label: "5" },
                    { y: percents[5], label: "6" },
                    { y: percents[6], label: "7" },
                    { y: percents[7], label: "8" },
                    { y: percents[8], label: "9" },
                    { y: percents[9], label: "10" }
                ]
            }]
        }

        return (
            <div>
                <Header/>
                <div className={"stat"}>
                    <div className={"teamStatistic"}>
                        <div className={"statisticAverageFeedbackMark"}>
                            <h4 id={"averageFeedbackMarkLabel"}>Average mark for feedback: </h4>
                            <h3 id={"averageFeedbackMarkValue"}>{averageFeedbackMark}</h3>
                        </div>
                        <div className={"statisticBestAverageFeedbackMark"}>
                            <h4 id={"bestAverageFeedbackMarkLabel"}>Average mark of the best feedback: </h4>
                            <h3 id={"bestAverageFeedbackMarkValue"}>{bestAverageFeedbackMark}</h3>
                        </div>
                        <div className={"statisticWorstAverageFeedbackMark"}>
                            <h4 id={"worstAverageFeedbackMarkLabel"}>Average mark of the worst feedback: </h4>
                            <h3 id={"worstAverageFeedbackMarkValue"}>{worstAverageFeedbackMark}</h3>
                        </div>
                        <div className={"statisticBestSkill"}>
                            <h4 id={"bestSkillLabel"}>The best skill: </h4>
                            <h3 id={"bestSkillName"}>{this.state.bestSkill.name}</h3>
                        </div>
                        <div className={"statisticWorstSkill"}>
                            <h4 id={"worstSkillLabel"}>The worst skill: </h4>
                            <h3 id={"worstSkillName"}>{this.state.worstSkill.name}</h3>
                        </div>
                        <div className={"teamStatisticBestFeedbackEmployee"}>
                            <h4 id={"teamBestFeedbackEmployeeLabel"}>The best employee: </h4>
                            <h3 id={"bestFeedbackEmployeeName"}>{this.state.bestEmployee.lastname}</h3>
                        </div>
                        <div className={"teamStatisticWorstFeedbackEmployee"}>
                            <h4 id={"teamWorstFeedbackEmployeeLabel"}>The worst employee: </h4>
                            <h3 id={"worstFeedbackEmployeeName"}>{this.state.worstEmployee.lastname}</h3>
                        </div>
                    </div>
                    <div className={"teamStatisticDiagram"}>
                        <CanvasJSChart options = {options}/>
                    </div>
                    <div className={"teamStatisticBackButton"}>
                        <NavLink to={"/team"}>
                            <button id={"teamStatisticBackButton"} type="button" className="btn btn-dark">Back</button>
                        </NavLink>
                    </div>
                    <div className={"teamStatisticSaveToPDF"}>
                        <button id={"teamStatisticSaveToPDFButton"} type="button" className="btn btn-dark"
                                onClick={this.pdfGenerator}>Save to PDF</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TeamStatistic;