import { NavLink } from "react-router-dom";

function Header() {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className={"container-fluid"}>
                <a className="navbar-brand" href="#">Employee system</a>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <li><NavLink className="nav-item nav-link" to={"/users/{id}"}>Profile</NavLink></li>
                        <li><NavLink className="nav-item nav-link" to={"/requests"}>Requests</NavLink></li>
                        <li><NavLink className="nav-item nav-link" to={"/packages"}>Packages</NavLink></li>
                        <li><NavLink className="nav-item nav-link" to={"/forms"}>Forms</NavLink></li>
                        <li><NavLink className="nav-item nav-link" to={"/employees"}>Employees</NavLink></li>
                        <li><NavLink className="nav-item nav-link" to={"/skills"}>Skills</NavLink></li>
                        <li><NavLink className="nav-item nav-link" to={"/statistic"}>Statistic</NavLink></li>
                        <li><NavLink className="nav-item nav-link" to={"/teams"}>Teams</NavLink></li>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header;