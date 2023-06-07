import {useState} from "react";
import {NavLink} from "react-router-dom";
import '../../style/auth/Registration.css'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Registration = () => {
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [isModal, setIsModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")

    function sendRequest() {
        const reqBody = {
            lastname: lastname,
            firstname: firstname,
            email: email,
            hashPassword: password
        };

        if (confirmedPassword !== password) {
            setErrorMessage("The passwords don't match.")
            setIsModal(true);
        } else {
            let cache = [];
            fetch("http://localhost:8080/auth/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqBody, function (key, value) {
                    if (typeof value === 'object' && value !== null) {
                        if (cache.indexOf(value) !== -1) {
                            return;
                        }
                        cache.push(value);
                    }
                    return value;
                })
            }).then((response) => {
                if (response.status === 200) {
                    return Promise.all([response.json()]);
                } else {
                    return Promise.reject("Invalid data.");
                }
            })
                .then(data => {
                    localStorage.setItem("jwtToken", data[0].jwtToken);
                    localStorage.setItem("currentUserRole", data[0].userRole);
                    localStorage.setItem("currentUserId", data[0].userId);
                    window.location.assign("/profile");
                }).catch(() => {
                setIsModal(true);
            });
        }
    }

    return (
        <div className={"registration"}>
            <h3>REGISTRATION</h3>
            <div className={"registrationLastname"}>
                <input id={"registrationLastnameInput"} type="text" className="form-control" placeholder="Lastname"
                       aria-label="Lastname" onChange={(event) => setLastname(event.target.value)}/>
            </div>
            <div className={"registrationFirstname"}>
                <input id={"registrationFirstnameInput"} type="text" className="form-control" placeholder="Firstname"
                       aria-label="Firstname" onChange={(event) => setFirstname(event.target.value)}/>
            </div>
            <div className={"registrationEmail"}>
                <input id={"registrationEmailInput"} type="text" className="form-control" placeholder="Email"
                       aria-label="Email" onChange={(event) => setEmail(event.target.value)}/>
            </div>
            <div className={"registrationPassword"}>
                <input id={"registrationPasswordInput"} type="password" className="form-control" placeholder="Password"
                       aria-label="Password" onChange={(event) => setPassword(event.target.value)}/>
            </div>
            <div className={"registrationConfirmedPassword"}>
                <input id={"registrationConfirmedPasswordInput"} type="password" className="form-control"
                       placeholder="ConfirmedPassword" aria-label="Email"
                       onChange={(event) => setConfirmedPassword(event.target.value)}/>
            </div>
            <div className={"authenticationLink"}>
                <NavLink className={"link-light"} to={"/"}>Have an account yet? Authentication</NavLink>
            </div>
            <div className={"registrationRegister"}>
                <button id={"registrationRegisterButton"} type="button" className="btn btn-dark"
                        onClick={() => sendRequest()}>REGISTER</button>
            </div>
            <Modal show={isModal} onHide={() => setIsModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning!</Modal.Title>
                </Modal.Header>
                <Modal.Body>{errorMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Registration;