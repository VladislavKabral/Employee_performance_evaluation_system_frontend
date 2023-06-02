import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import Header from "../header/Header.jsx";

class UpdatePackage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forms: [],
            users: [],
            package: {},
            form: {},
            user: {}
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/forms')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    forms: data
                })
            }).catch(function (error) {
            console.log(error);
        })

        fetch('http://localhost:8080/users')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    users: data
                })
            }).catch(function (error) {
            console.log(error);
        })

        fetch(`http://localhost:8080/packages/${localStorage.getItem("packageId")}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    package: data,
                    form: data.form,
                    user: data.targetUser
                })
            }).catch(function (error) {
            console.log(error);
        })
    }

    async updatePackage() {
        const nameInput = document.getElementById('packageNameInput');
        const name = nameInput.value;

        const formInput = document.getElementById('formInput');
        const formName = formInput.value;
        let form = {
            name: formName
        }

        const userInput = document.getElementById('userInput');
        const userFullName = userInput.value.split(" ");
        const userFirstname = userFullName[1];
        const userLastname = userFullName[0];
        let user = {
            lastname: userLastname,
            firstname: userFirstname
        }

        const isPublic = document.getElementById('isPublicInput');

        let cache = [];
        if (name) {
            await fetch(`http://localhost:8080/packages/${localStorage.getItem("packageId")}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({name: name, isPublic: isPublic.checked, form: form, targetUser: user}, function(key, value) {
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
            window.location.assign("/package");
        }
    }

    generateFormsSelector() {
        let options = [];
        const defaultValue = localStorage.getItem("formName");
        this.state.forms.map((form) => {
            if (defaultValue === form.name) {
                options.push(<option selected>{form.name}</option>);
            } else {
                options.push(<option>{form.name}</option>);
            }
        })

        return (
            React.Children.toArray(options)
        )
    }

    generateUsersSelector() {
        let options = [];
        const defaultValue = localStorage.getItem("userFullName");
        this.state.users.map((user) => {
            const userFullName = user.lastname + " " + user.firstname;
            if (defaultValue === userFullName) {
                options.push(<option selected>{userFullName}</option>);
            } else {
                options.push(<option>{userFullName}</option>);
            }
        })

        return (
            React.Children.toArray(options)
        )
    }

    render() {
        return (
            <div>
                <Header/>
                <div className={"text"}>
                    <h1>Updating the package</h1>
                </div>
                <div className={"packageNameField"}>
                    <input id={"packageNameInput"} type="text" className="form-control" placeholder="Package name"
                           aria-label="Package name" defaultValue={this.state.package.name}/>
                </div>
                <div className={"formInputSelect"}>
                    <select className="form-control" id={"formInput"}
                            defaultValue={localStorage.getItem("formName")}>
                        {this.generateFormsSelector()}
                    </select>
                </div>
                <div className={"userInputSelect"}>
                    <select className="form-control" id={"userInput"}
                            defaultValue={localStorage.getItem("userFullName")}>
                        {this.generateUsersSelector()}
                    </select>
                </div>
                <div className={"isPublicInput"}>
                    <div className={"text"} id={"isPublicLabel"}>
                        <h4>Public: </h4>
                    </div>
                    <div className={"isPublicCheck"}>
                        <input className="form-check-input" type="checkbox" value="" id={"isPublicInput"}
                               defaultChecked={localStorage.getItem("packageIsPublic") === "true"}/>
                    </div>
                </div>
                <div className={"button"}>
                    <button id={"addPackageCreateButton"} type="button" className="btn btn-dark"
                            onClick={() => this.updatePackage()}>Update package</button>
                </div>
                <div className={"button"}>
                    <NavLink to={"/package"}>
                        <button id={"addPackageBackButton"} type="button" className="btn btn-dark">Back</button>
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default UpdatePackage;