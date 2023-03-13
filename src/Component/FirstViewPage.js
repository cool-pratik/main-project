import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { FaUserPlus } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import LogIn from './LogIn';
// import LoginPage from './loginPage';
import Registration from './Registration';
import Footer from './Footer';
import DashBoard from './DashBoard';
import LoginPage from './LoginPage';

export default class FirstViewPage extends Component {
    render() {
        return (
            <Router>
                <Navbar >
                    <img id='logo' src={require('./Logo.jpg')} width="100" height="100" margin-left='10px'  />
                    <Container>
                        {/* <Navbar.Brand href="#home">Rays technologies</Navbar.Brand> */}
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="Registration">Regsitration<FaUserPlus /></Nav.Link>
                            <Nav.Link href="LogInPage">LogIn<MdLogin /></Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                <Routes>
                     {/* <Route path='/LogIn' element={<LoginPage />} /> */}
                     <Route path='/LogInPage' element={<LoginPage />} />
                     <Route path='Registration' element={<Registration/>} />
                </Routes>
                <Footer/>
               <div>hii</div>
            </Router>
        )
    }
}
