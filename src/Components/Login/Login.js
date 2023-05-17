import { useState } from 'react';
import { Link } from "react-router-dom";
import CredentialNavbar from '../CredentialNavbar/CredentialNavbar.js';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (event) => {
        event.preventDefault();

        const response = await fetch('https://u09rohief7.execute-api.us-east-1.amazonaws.com/dev/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'        
            },
            body: JSON.stringify({
                email, 
                password,
            })
        });

        const data = await response.json();
        
        if (data.user) {
            localStorage.setItem('token', data.user);
            alert('Login Successful');
            window.location.href = 'https://erick1439.github.io/Contacts-app-client/#/dashboard';
        }

        else
            alert('Please check your username and password');
    }

    return(
        <div className="auth-wrapper">
            <div className="auth-inner">
                <CredentialNavbar/>
                <form onSubmit={submitHandler}> 
                    <h3>Sign In</h3>
                    <div className="form-group">
                        <label>Email address:</label>
                        <input type="email" className="form-control" placeholder="Enter email" onChange={event => setEmail(event.target.value)} name="email" />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password" onChange={event => setPassword(event.target.value)} name="password" />
                    </div>
                    <div id="rememberMeSection" className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    <p className="forgot-password text-right">
                        Forgot <Link to={'/'}>password?</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;