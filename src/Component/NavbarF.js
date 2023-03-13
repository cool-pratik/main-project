import React, { Component } from "react";
import ReactDOM from "react-dom/client";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
// import AddUser from "./AddUser";
import UserList from "./UserList";
import AddmarkSheet from "./Addmarksheet";
import MarksheetList from "./MarksheetList";
import AddStudent from "./AddStudent";
import StudentList from "./StudentList";
import AddCollege from "./AddCollege";
import CollegeList from "./CollegeList";
import AddRole from "./AddRole";
import RoleList from "./RoleList";
import MyProfile from "./MyProfile";
import ChangePassword from "./ChangePassword";
import Check from "./check";
import FormMessage from "./FormMessage";
import Registration from "./Registration";
import { FaUserPlus } from "react-icons/fa";
import "../App.css";
import { MdLogin } from "react-icons/md";
import LoginPage from "./LoginPage";
import NavBar from "./Navbar";
// import DashBoard from "./DashBoard";
export default class NavbarF extends Component {

  componentDidMount(){
    let root = null ;
    if (localStorage.getItem("Name")) {
       root = ReactDOM.createRoot(document.getElementById("root"));
      root.render(<NavBar />);
    }
  }
  render() {
    return (
      <BrowserRouter>
        <Navbar collapseOnSelect expand="lg">
          <img
            id="logo"
            src={require("./NCSLogoOutglow.jpg")}
            width="100"
            height="50"
            margin-left="10px"
            alt="Rays"
          />
          <Container>
            {/* <Navbar.Brand href="#home">Rays technologies</Navbar.Brand> */}
            <Nav className="me-auto">
              <Nav.Link>
                <Link style={{ color: "black" }} to="/Registration">
                  Regsitration
                </Link>
                <FaUserPlus />
              </Nav.Link>
              <Nav.Link>
                <Link style={{ color: "black" }} to="/logInPage">
                  LogIn
                </Link>
                <MdLogin />
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/logInPage" element={<LoginPage />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
