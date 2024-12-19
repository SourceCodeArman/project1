import './App.css';
import SignUp from './components/SignUp'
import {Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import Admin from "./components/Admin";
import Profile from "./components/Profile";
import AdminProfile from "./components/AdminProfile";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Welcome" element={<Welcome />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/AdminProfile" element={<AdminProfile />} />
        </Routes>
    </div>
  );
}

export default App;
