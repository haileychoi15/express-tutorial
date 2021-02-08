import React, { useState, useContext } from 'react';
import { AuthContext } from 'context/AuthContext';
import { withRouter } from "react-router-dom";

function Login() {

    const { loginUser } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        if(name === "email") {
            setEmail(value);
        }
        else if(name === "password"){
            setPassword(value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(email, password);
    }

    return (
        <div>
            <section>
                <h1>Login</h1>
                <form action="" onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label htmlFor="login-email">Email</label>
                        <input type="email" id="login-email" name="email" autoComplete="current-email" value={email} onChange={(e) => handleInputChange(e)} />
                    </div>
                    <div>
                        <label htmlFor="login-password">Password</label>
                        <input type="password" id="login-password" name="password" autoComplete="current-password" value={password} onChange={(e) => handleInputChange(e)} />
                    </div>
                    <input type="submit" value="Login" />
                </form>
            </section>
        </div>
    )
}

export default withRouter(Login);
