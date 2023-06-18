import { NavLink } from "react-router-dom";

function Header() {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className={"container-fluid"}>
                <a className="navbar-brand" href="../profile">Employee system</a>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        {(localStorage.getItem("currentUserRole") === "DIRECTOR" ||
                            localStorage.getItem("currentUserRole") === "MANAGER" ||
                            localStorage.getItem("currentUserRole") === "WORKER") &&
                            <li><NavLink className="nav-item nav-link" to={"/profile"}>Profile</NavLink></li>
                        }
                        {(localStorage.getItem("currentUserRole") === "DIRECTOR" ||
                            localStorage.getItem("currentUserRole") === "MANAGER" ||
                            localStorage.getItem("currentUserRole") === "WORKER") &&
                            <li><NavLink className="nav-item nav-link" to={"/requests"}>Requests</NavLink></li>
                        }
                        {(localStorage.getItem("currentUserRole") === "DIRECTOR" ||
                            localStorage.getItem("currentUserRole") === "MANAGER" ||
                            localStorage.getItem("currentUserRole") === "WORKER") &&
                            <li><NavLink className="nav-item nav-link" to={"/userFeedbacks"}>Feedbacks</NavLink></li>
                        }
                        {(localStorage.getItem("currentUserRole") === "DIRECTOR" ||
                            localStorage.getItem("currentUserRole") === "MANAGER") &&
                            <li><NavLink className="nav-item nav-link" to={"/packages"}>Packages</NavLink></li>
                        }
                        {(localStorage.getItem("currentUserRole") === "DIRECTOR" ||
                            localStorage.getItem("currentUserRole") === "MANAGER") &&
                            <li><NavLink className="nav-item nav-link" to={"/forms"}>Forms</NavLink></li>
                        }
                        {(localStorage.getItem("currentUserRole") === "DIRECTOR" ||
                            localStorage.getItem("currentUserRole") === "MANAGER") &&
                            <li><NavLink className="nav-item nav-link" to={"/employees"}>Employees</NavLink></li>
                        }
                        {localStorage.getItem("currentUserRole") === "DIRECTOR" &&
                            <li><NavLink className="nav-item nav-link" to={"/skills"}>Skills</NavLink></li>
                        }
                        {(localStorage.getItem("currentUserRole") === "DIRECTOR" ||
                            localStorage.getItem("currentUserRole") === "MANAGER" ||
                            localStorage.getItem("currentUserRole") === "WORKER") &&
                            <li><NavLink className="nav-item nav-link" to={"/userStatistic"}>Statistic</NavLink></li>
                        }
                        {(localStorage.getItem("currentUserRole") === "DIRECTOR" ||
                            localStorage.getItem("currentUserRole") === "MANAGER") &&
                            <li><NavLink className="nav-item nav-link" to={"/teams"}>Teams</NavLink></li>
                        }
                        {(localStorage.getItem("currentUserRole") === "DIRECTOR" ||
                            localStorage.getItem("currentUserRole") === "MANAGER") &&
                            <li><NavLink className="nav-item nav-link" to={"/search"}>Search</NavLink></li>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header;