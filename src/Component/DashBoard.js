// import React, { Component } from "react";
// // import NavBar from "./Navbar";
// export default class DashBoard extends Component {
//   render() {
//     return (
//       <>
      
//       </>
//       //  <NavBar></NavBar>
      

//     );
//   }
// }


import React, { Component } from "react";
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
// import DashBoard from "./DashBoard";


export default class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null,
    };
  }
  // showAlert = (message, type) => {
  //   this.setState({ alert: { message: message, type: type } });
  //   setTimeout(() => {
  //     this.setState({ alert: null });
  //   }, 3000);
  // };
  logOut() {
    window.localStorage.clear();
    window.location.href = "/loginPage";
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
            <Navbar.Brand href="#home">Ray Technologies</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="Users" id="collasible-nav-dropdown">
                  <NavDropdown.Item>
                    <Link className="link" to="/registration">
                      {" "}
                      Add User{" "}
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link className="link" to="/UserList">
                      {" "}
                      UserList{" "}
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="MarkSheet" id="collasible-nav-dropdown">
                  <NavDropdown.Item>
                    <Link className="link" to="/AddMarkSheet">
                      {" "}
                      Add MarkSheet{" "}
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link className="link" to="/MarksheetList">
                      {" "}
                      MarkSheet List{" "}
                    </Link>
                  </NavDropdown.Item>
                  {/* <NavDropdown.Item>
                <Link className="link" to="/check">  Merit List </Link>        
                </NavDropdown.Item> */}
                </NavDropdown>
                <NavDropdown title="Student" id="collasible-nav-dropdown">
                  <NavDropdown.Item>
                    <Link className="link" to="/AddStudent">
                      {" "}
                      Add Student{" "}
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link className="link" to="/StudentList">
                      {" "}
                      Student List{" "}
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Roles" id="collasible-nav-dropdown">
                  <NavDropdown.Item>
                    <Link className="link" to="/AddRole">
                      {" "}
                      Add Role{" "}
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link className="link" to="/RoleList">
                      {" "}
                      Roles List{" "}
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Collage" id="collasible-nav-dropdown">
                  <NavDropdown.Item>
                    <Link className="link" to="/AddCollege">
                      {" "}
                      Add College{" "}
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link className="link" to="/CollegeList">
                      {" "}
                      College List{" "}
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
                {localStorage.getItem("Name") && (
                  <NavDropdown
                    title={localStorage.getItem("Name")}
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item>
                      <Link className="link" to="/MyProfile">
                        {" "}
                        MyProfile{" "}
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link className="link" to="/ChangePassword">
                        {" "}
                        Change Password{" "}
                      </Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
                <Nav.Link onClick={this.logOut}>LogOut</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {/* <img
        className="logoclass"
            src={require("./NCSLogoOutglow.jpg")}
            // position 'absolute', left: '50%', top: '50%',
            // text-align ='center'
            // flex='center'

            width="300"
            height="200"
            margin-left="100px"
            padding-top = '500px'
            alt="Rays"
          /> */}
        {/* <Navbar collapseOnSelect expand="lg">
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
            {/* <Nav className="me-auto">
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
        </Navbar> */} 
       
        
        <FormMessage alert={this.state.alert} />
        <Routes>
          {/* <Route path="/logInPage" element={<LoginPage />} /> */}
          {/* <Route path="/registration" element={<Registration />} /> */}
          <Route path="AddRole" key="add-role" element={<AddRole />} />
          <Route
            path="registration"
            key="add-user"
            element={<Registration />}
          />
          <Route path="Dashboard" key="add-user" element={<DashBoard />} />

          <Route path="AddCollege" element={<AddCollege />} />
          <Route path="AddStudent" element={<AddStudent />} />
          <Route path="Addmarksheet" element={<AddmarkSheet />} />
          <Route
            path="registration/:pid"
            key="edit-user"
            element={<Registration />}
          />
          <Route path="AddRole/:pid" key="edit-role" element={<AddRole />} />
          <Route
            path="AddStudent/:pid"
            key="edit-student"
            element={<AddStudent />}
          />
          <Route
            path="Addmarksheet/:pid"
            key="edit-student"
            element={<AddmarkSheet />}
          />
          <Route
            path="AddCollege/:pid"
            key="edit-college"
            element={<AddCollege />}
          />
          <Route path="UserList/*" element={<UserList />} />
          <Route path="RoleList/*" element={<RoleList />} />
          <Route path="CollegeList/*" element={<CollegeList />} />
          <Route path="StudentList/*" element={<StudentList />} />
          <Route path="MarksheetList" element={<MarksheetList />} />
          <Route path="check" element={<Check />} />
          <Route path="MyProfile" element={<MyProfile />} />
          <Route path="ChangePassword" element={<ChangePassword />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
