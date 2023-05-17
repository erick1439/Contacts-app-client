import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import CredentialNavbar from "../CredentialNavbar/CredentialNavbar.js";

const Register = () => {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (event) => {
        event.preventDefault();

        const response = await fetch('https://u09rohief7.execute-api.us-east-1.amazonaws.com/dev/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'        
            },
            body: JSON.stringify({
                firstName, 
                lastName,
                email,
                password
            })
        });

        const data = await response.json();

        if (data.registration) {
            alert('User created successfully');
            navigate('/login');
        }

        else {

            if (data.mssg === 'User already exists')
                alert('Email is already in use');

            else
                alert('User not created. Please try again');
        }
        
    }

    return(
        <div className="auth-wrapper">
            <div className="auth-inner">
                <CredentialNavbar/>
                <form onSubmit={submitHandler}>
                    <h3>Sign Up</h3>

                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" className="form-control inputLabel" placeholder="First name" onChange={event => setFirstName(event.target.value)} name="firstName" />
                    </div>

                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" className="form-control inputLabel" placeholder="Last name" onChange={event => setLastName(event.target.value)} name="lastName" />
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control inputLabel" placeholder="Enter email" onChange={event => setEmail(event.target.value)} name="email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control inputLabel" placeholder="Enter password" onChange={event => setPassword(event.target.value)} name="password" />
                    </div>

                    <button id="registrationButton" type="submit" className="btn btn-primary btn-block">Sign Up</button>
                    <p className="forgot-password text-right">
                        Already registered <Link to={'/'}>sign in?</Link>
                    </p>
                    <p className="errorMessage"></p>
                </form>
            </div>
        </div>
    );
}

export default Register;