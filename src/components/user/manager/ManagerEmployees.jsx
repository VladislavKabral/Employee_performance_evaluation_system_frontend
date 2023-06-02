import {Component} from "react";

class ManagerEmployees extends Component {

    constructor(props) {
        super(props);
        this.state = {
            manager: {},
            users: []
        }
    }

    componentDidMount() {
        fetch(`http://localhost:8080/users/manager/${localStorage.getItem("currentUserId")}/users`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    users: data
                })
                console.log(data)
            }).catch(function (error) {
            console.log(error);
        })
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

export default ManagerEmployees;