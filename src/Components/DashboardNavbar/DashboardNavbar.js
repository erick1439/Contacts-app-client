import './DashboardNavbar.css';
import React, { useState } from "react";
import  { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AddUserPopup from "../AddUserPopup/AddUserPopup.js";

const DashboardNavbar = ({firstName, lastName, addNewContact}) => {

    const navigate = useNavigate();

    const logoutUser = () => {
        localStorage.removeItem('token');
        window.location.href = "https://erick1439.github.io/Contacts-app-client";
    }

    const [popup, setPopup] = useState(false);

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
                <h1 className="navbar-brand">Welcome {firstName} {lastName}</h1>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Button variant="link" onClick={() => setPopup(true)}>Add user</Button>
                        </li>
                        <li className="nav-item">
                            <Button variant="link" onClick={logoutUser}>Logout</Button>
                        </li>
                    </ul>
                    <AddUserPopup show={popup} addnewcontact={addNewContact} onHide={() => setPopup(false)}/>
                </div>
            </div>
        </nav> 
    ) 
}

export default DashboardNavbar;