import "./App.css";
import Home from "./Components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Browse from "./Components/Browse";
import AddQuestion from "./Components/AddQuestion";
import Header from "./Components/Header";
import UserProfile from "./Components/UserProfile";
import EditUnverifiedQ from "./Components/EditUnverifiedQ";
import ChangePassword from "./Components/ChangePassword";
import Api from "./Components/Api";
function App() {
  return (
    <div className="App">
      {" "}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Browse" element={<Browse />} />
          <Route path="/AddQuestion" element={<AddQuestion />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/EditUnverifiedQ" element={<EditUnverifiedQ />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route path="/Api" element={<Api />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
