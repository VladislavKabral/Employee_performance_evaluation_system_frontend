import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import '../../style/package/Package.css'

class AddPackage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            forms: [],
            users: []
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
    }

    async createPackage() {
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
            await fetch('http://localhost:8080/packages', {
                method: 'POST',
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
            //window.location.assign("/packages");
        }
    }

    generateFormsSelector() {
        let options = [];
        this.state.forms.map((form) => {
            options.push(<option>{form.name}</option>);
        })

        return (
            React.Children.toArray(options)
        )
    }

    generateUsersSelector() {
        let options = [];
        this.state.users.map((user) => {
            options.push(<option>{user.lastname + " " + user.firstname}</option>);
        })

        return (
            React.Children.toArray(options)
        )
    }

    render() {
        return (
            <div>
                <div className={"text"}>
                    <h1>Creation new package</h1>
                </div>
                <div className={"packageNameField"}>
                    <input id={"packageNameInput"} type="text" className="form-control" placeholder="Package name"
                           aria-label="Package name"/>
                </div>
                <div className={"formInputSelect"}>
                    <select className="form-control" id={"formInput"}>
                        {this.generateFormsSelector()}
                    </select>
                </div>
                <div className={"userInputSelect"}>
                    <select className="form-control" id={"userInput"}>
                        {this.generateUsersSelector()}
                    </select>
                </div>
                <div className={"isPublicInput"}>
                    <div className={"text"} id={"isPublicLabel"}>
                        <h4>Public: </h4>
                    </div>
                    <div className={"isPublicCheck"}>
                        <input className="form-check-input" type="checkbox" value="" id={"isPublicInput"}/>
                    </div>
                </div>
                <div className={"button"}>
                    <button id={"addPackageCreateButton"} type="button" className="btn btn-dark"
                            onClick={() => this.createPackage()}>Create package</button>
                </div>
                <div className={"button"}>
                    <NavLink to={"/packages"}>
                        <button id={"addPackageBackButton"} type="button" className="btn btn-dark">Back</button>
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default AddPackage;