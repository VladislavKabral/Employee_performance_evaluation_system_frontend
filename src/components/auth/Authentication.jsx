import '../../style/auth/Authentication.css'
import {NavLink} from "react-router-dom";
import {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Authentication = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isModal, setIsModal] = useState(false);

    function sendRequest() {
        const reqBody = {
            email: email,
            password: password
        };

        let cache = [];
        fetch("http://localhost:8080/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody, function(key, value) {
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
                return Promise.reject("Invalid credentials.");
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

    return (
        <div className={"authentication"}>
            <h3 >AUTHENTICATION</h3>
            <div className={"authenticationEmail"}>
                <input id={"authenticationEmailInput"} type="text" className="form-control" placeholder="Email"
                       aria-label="Email" onChange={(event) => setEmail(event.target.value)}/>
            </div>
            <div className={"authenticationPassword"}>
                <input id={"authenticationPasswordInput"} type="password" className="form-control" placeholder="Password"
                       aria-label="Password" onChange={(event) => setPassword(event.target.value)}/>
            </div>
            <div className={"registrationLink"}>
                <NavLink className={"link-light"} to={"/register"}>Don`t have an account yet? Register</NavLink>
            </div>
            <div className={"authenticationSignIn"}>
                <button id={"authenticationSignInButton"} type="button" className="btn btn-dark"
                        onClick={() => sendRequest()}>SIGN IN</button>
            </div>
            <Modal show={isModal} onHide={() => setIsModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Invalid login or password.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Authentication;