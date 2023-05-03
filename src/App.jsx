import './App.css'
import {Route, Routes} from "react-router";
import Header from "./components/header/Header.jsx";
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

function App() {

  return (
    <div>
      <Header/>
        <div className={"content"}>
            <Routes>
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
            </Routes>
        </div>
    </div>
  )
}

export default App
