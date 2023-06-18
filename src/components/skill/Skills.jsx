import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import Header from "../header/Header.jsx";

class Skills extends Component {

    constructor(props) {
        super(props);
        this.state = {
            skills: [],
            currentSkills: [],
            currentPage: 0
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/skills', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    skills: data
                })
            }).catch(function (error) {
            console.log(error);
        })

        this.getCurrentSkills(this.state.currentPage);
    }

    processSkill(index, skill) {
        return (
            <>
                <tr>
                    <td>{index}</td>
                    <td>
                        <NavLink className={"nav-link"} to={"/skill"} onClick={() => localStorage.setItem("skillId", skill.id)}>
                            {skill.name}
                        </NavLink>
                    </td>
                    <td>
                        {skill.description}
                    </td>
                </tr>
            </>
        )
    }

    async getCurrentSkills(pageNumber) {
        await fetch(`http://localhost:8080/skills/page/${pageNumber}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }
        }).then(response => response.json())
            .then(data => {
                this.setState({
                    currentSkills: data
                })
            }).catch(function (error) {
                console.log(error);
            });
        this.componentDidMount();
    }

    generatePageLink(index) {
        return (
            <>
                <li className="page-item"><a className="page-link"
                                             onClick={() => this.setState({currentPage: index - 1})}>{index}</a></li>
            </>
        )
    }

    handleClickToPreviousPage = () => {
        const page = this.state.currentPage;

        if (page > 0) {
            this.setState({currentPage:  this.state.currentPage - 1})
        }
    }

    handleClickToNextPage = (pageCount) => {
        const page = this.state.currentPage;

        if (page < pageCount - 1) {
            this.setState({currentPage:  this.state.currentPage + 1})
        }
    }

    render() {
        const processedSkills = React.Children.toArray(this.state.currentSkills.map((skill) =>
            this.processSkill(this.state.currentSkills.indexOf(skill) + 1, skill)));

        const countOfPages = Math.ceil(this.state.skills.length / 10);

        let tempLinks = [];
        for (let i = 1; i <= countOfPages; i++) {
            tempLinks.push(this.generatePageLink(i));
        }

        const pageLinks = React.Children.toArray(tempLinks);

        return (
            <div>
                <Header/>
                <div className={"skills"}>
                    <div className={"table"}>
                        <table className="table table-bordered table-dark">
                            <thead>
                            <tr>
                                <th scope="col">№</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                            </tr>
                            </thead>
                            <tbody>
                            {processedSkills}
                            </tbody>
                        </table>
                    </div>
                    <div className={"skillsPages"}>
                        <nav aria-label="Page navigation">
                            <ul className="pagination">
                                <li className="page-item"><a className="page-link"
                                     onClick={() => this.handleClickToPreviousPage()}>
                                    Previous</a></li>
                                {pageLinks}
                                <li className="page-item"><a className="page-link"
                                     onClick={() => this.handleClickToNextPage(countOfPages)}>
                                    Next</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className={"button"}>
                        <NavLink to={"/addSkill"}>
                            <button id={"skillsCreateNewSkillButton"} type="button" className="btn btn-dark">Create new skill</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

export default Skills;