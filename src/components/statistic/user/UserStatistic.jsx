import React, {Component} from "react";
import '../../../style/statistic/user/UserStatistic.css'
import CanvasJSReact from '@canvasjs/react-charts';
import Header from "../../header/Header.jsx";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class UserStatistic extends Component {

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
        fetch(`http://localhost:8080/users/${localStorage.getItem("currentUserId")}`, {
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

        fetch(`http://localhost:8080/users/${localStorage.getItem("currentUserId")}/statistic`, {
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

    render() {
        console.log(localStorage.getItem("marks"));
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
                    <div className={"statisticDiagram"}>
                        <CanvasJSChart options = {options}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserStatistic;