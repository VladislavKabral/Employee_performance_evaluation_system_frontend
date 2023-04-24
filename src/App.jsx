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

function App() {

  return (
    <div>
      <Header/>
        <div className={"content"}>
            <Routes>
                <Route path={"/teams"} element={<Teams/>}/>
                <Route path={"/skills"} element={<Skills/>}/>
                <Route path={"/forms"} element={<Form/>}/>
                <Route path={"/team"} element={<Team/>}/>
                <Route path={"/addTeam"} element={<AddTeam/>}/>
                <Route path={"/updateTeam"} element={<UpdateTeam/>}/>
                <Route path={"/skill"} element={<Skill/>}/>
                <Route path={"/updateSkill"} element={<UpdateSkill/>}/>
                <Route path={"/addSkill"} element={<AddSkill/>}/>
            </Routes>
        </div>
    </div>
  )
}

export default App
