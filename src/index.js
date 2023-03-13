import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
// import FirstViewPage from './Component/FirstViewPage';
import NavBar from './Component/Navbar';
import NavbarF from './Component/NavbarF';
import DashBoard from './Component/DashBoard';
// import AddRole from './Component/AddRole';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <DashBoard /> */}
    {/* <NavBar /> */}
    <NavbarF />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
