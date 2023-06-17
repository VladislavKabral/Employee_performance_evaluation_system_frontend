import React, {Component} from "react";
import '../../../style/statistic/user/UserStatistic.css'
import CanvasJSReact from '@canvasjs/react-charts';
import Header from "../../header/Header.jsx";
import JSPDF from "jspdf";
import html2canvas from "html2canvas";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class EmployeeStatistic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            statistic: {},
            bestSkill: {},
            worstSkill: {},
            bestEmployee: {},
            worstEmployee: {},
            distributionOfMarks: []
        }
    }

    componentDidMount() {
        fetch(`http://localhost:8080/users/${localStorage.getItem("userId")}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    user: data
                })
            }).catch(function (error) {
            console.log(error);
        })

        fetch(`http://localhost:8080/users/${localStorage.getItem("userId")}/statistic`, {
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
                    bestEmployee: data.bestFeedbackEmployee,
                    worstEmployee: data.worstFeedbackEmployee,
                    distributionOfMarks: data.distributionOfMarks
                })
            }).catch(function (error) {
            console.log(error);
        })
    }

    pdfGenerator = () => {
        const employeeLastname = this.state.user.lastname;
        const doc = new JSPDF('p', 'pt');
        const currentDate = new Date().toLocaleString('en', {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

        doc.line(0, 50, 1200, 50);

        doc.setFont('times', 'bold', 48);
        doc.text('EMPLOYEE`S STATISTIC', 200, 30);

        doc.setFont('courier', 'bold', 64);

        doc.text('Employee: ' + this.state.user.lastname + ' ' + this.state.user.firstname, 50, 100);
        doc.text('Date: ' + currentDate, 250, 100);

        doc.text('Average mark for feedback:   ' + localStorage.getItem("averageFeedbackMark"), 50, 150);
        doc.text('Average mark of the best feedback:   ' + localStorage.getItem("bestAverageFeedbackMark"),
            50, 175);
        doc.text('Average mark of the worst feedback:   ' + localStorage.getItem("worstAverageFeedbackMark"),
            50, 200);
        doc.text('The best skill:   ' + this.state.bestSkill.name, 50, 225);
        doc.text('The worst skill:   ' + this.state.worstSkill.name, 50, 250);
        doc.text('The employee, who rated the best:   ' + this.state.bestEmployee.lastname, 50, 275);
        doc.text('The employee, who rated the worst:   ' + this.state.worstEmployee.lastname, 50, 300);
        html2canvas(document.getElementById('employeeStatisticChart')).then(function (canvas) {
            doc.addImage(canvas.toDataURL('image/png'), 'PNG', 50, 350, 500, 300);
            doc.save(employeeLastname + " statistic.pdf");
        });
        doc.setFont('times', 'bold', 24);
        doc.text('Employee performance evaluation system', 50, 830);

        doc.line(0, 800, 1200, 800);
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
            height: 280,
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
                <div className={"userStatistic"}>
                    <div className={"userStatisticFullName"}>
                        <img id={"userAvatar"} src={"./src/assets/emptyAvatar.jpg"} alt={"Avatar"}/>
                        <h2>{this.state.user.lastname}</h2>
                        <h2>{this.state.user.firstname}</h2>
                    </div>
                    <div className={"statistic"}>
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
                        <div className={"statisticBestFeedbackEmployee"}>
                            <h4 id={"bestFeedbackEmployeeLabel"}>The employee, who rated the best: </h4>
                            <h3 id={"bestFeedbackEmployeeName"}>{this.state.bestEmployee.lastname}</h3>
                        </div>
                        <div className={"statisticWorstFeedbackEmployee"}>
                            <h4 id={"worstFeedbackEmployeeLabel"}>The employee, who rated the worst: </h4>
                            <h3 id={"worstFeedbackEmployeeName"}>{this.state.worstEmployee.lastname}</h3>
                        </div>
                    </div>
                    <div id={"employeeStatisticChart"} className={"statisticDiagram"}>
                        <CanvasJSChart options = {options}/>
                    </div>
                    <div className={"employeeStatisticPrintDPF"}>
                        <button id={"employeeStatisticPrintDPF"} type="button" className="btn btn-dark"
                        onClick={this.pdfGenerator}>Save to PDF</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default EmployeeStatistic;