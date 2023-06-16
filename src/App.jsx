import './App.css'
import {Route, Routes} from "react-router";
import Teams from "./components/team/Teams.jsx";
import Skill from "./components/skill/Skill.jsx";
import Form from "./components/form/Form.jsx";
import Team from "./components/team/Team.jsx";
import AddTeam from "./components/team/AddTeam.jsx";
import UpdateTeam from "./components/team/UpdateTeam.jsx";
import Skills from "./components/skill/Skills.jsx";
import UpdateSkill from "./components/skill/UpdateSkill.jsx";
import AddSkill from "./components/skill/AddSkill.jsx";
import AddForm from "./components/form/AddForm.jsx";
import Forms from "./components/form/Forms.jsx";
import UpdateForm from "./components/form/UpdateForm.jsx";
import Packages from "./components/package/Packages.jsx";
import AddPackage from "./components/package/AddPackage.jsx";
import UpdatePackage from "./components/package/UpdatePackage.jsx";
import Package from "./components/package/Package.jsx";
import Profile from "./components/user/Profile.jsx";
import CreateRequest from "./components/request/CreateRequest.jsx";
import Requests from "./components/request/Requests.jsx";
import CompleteFeedback from "./components/feedback/CompleteFeedback.jsx";
import Feedback from "./components/feedback/Feedback.jsx";
import Report from "./components/package/report/Report.jsx";
import UserStatistic from "./components/statistic/user/UserStatistic.jsx";
import TeamStatistic from "./components/statistic/team/TeamStatistic.jsx";
import Authentication from "./components/auth/Authentication.jsx";
import ManagerEmployees from "./components/user/manager/ManagerEmployees.jsx";
import EmployeeProfile from "./components/user/employee/EmployeeProfile.jsx";
import EmployeeStatistic from "./components/user/employee/EmployeeStatistic.jsx";
import Registration from "./components/auth/Registration.jsx";
import EmployeeEdit from "./components/user/employee/EmployeeEdit.jsx";
import UserFeedbacks from "./components/feedback/UserFeedbacks.jsx";

function App() {

  return (
    <div>
        <div className={"content"}>
            <Routes>
                <Route path={"/"} element={<Authentication/>}/>
                <Route path={"/register"} element={<Registration/>}/>
                <Route path={"/teams"} element={<Teams/>}/>
                <Route path={"/skills"} element={<Skills/>}/>
                <Route path={"/team"} element={<Team/>}/>
                <Route path={"/addTeam"} element={<AddTeam/>}/>
                <Route path={"/updateTeam"} element={<UpdateTeam/>}/>
                <Route path={"/skill"} element={<Skill/>}/>
                <Route path={"/updateSkill"} element={<UpdateSkill/>}/>
                <Route path={"/addSkill"} element={<AddSkill/>}/>
                <Route path={"/forms"} element={<Forms/>}/>
                <Route path={"/form"} element={<Form/>}/>
                <Route path={"/addForm"} element={<AddForm/>}/>
                <Route path={"/updateForm"} element={<UpdateForm/>}/>
                <Route path={"/packages"} element={<Packages/>}/>
                <Route path={"/package"} element={<Package/>}/>
                <Route path={"/addPackage"} element={<AddPackage/>}/>
                <Route path={"/updatePackage"} element={<UpdatePackage/>}/>
                <Route path={"/profile"} element={<Profile/>}/>
                <Route path={"/createRequest"} element={<CreateRequest/>}/>
                <Route path={"/requests"} element={<Requests/>}/>
                <Route path={"/completeFeedback"} element={<CompleteFeedback/>}/>
                <Route path={"/feedback"} element={<Feedback/>}/>
                <Route path={"/report"} element={<Report/>}/>
                <Route path={"/userStatistic"} element={<UserStatistic/>}/>
                <Route path={"/teamStatistic"} element={<TeamStatistic/>}/>
                <Route path={"/employees"} element={<ManagerEmployees/>}/>
                <Route path={"/employeeProfile"} element={<EmployeeProfile/>}/>
                <Route path={"/employeeStatistic"} element={<EmployeeStatistic/>}/>
                <Route path={"/employeeEdit"} element={<EmployeeEdit/>}/>
                <Route path={"/userFeedbacks"} element={<UserFeedbacks/>}/>
            </Routes>
        </div>
    </div>
  )
}

export default App