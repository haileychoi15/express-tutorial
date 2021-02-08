import React, { useState, useContext } from 'react';
import { AuthContext } from 'context/AuthContext';
import { withRouter } from "react-router-dom";

function Register() {

    const { registerUser } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        if(name === "email") {
            setEmail(value);
        }
        else if(name === "password") {
            setPassword(value);
        }
        else if(name === "name") {
            setName(value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            name,
            email,
            password
        }
        registerUser(newUser);
    }

    return (
        <div>
            <section>
                <h1>Register</h1>
                <form action="" onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label htmlFor="register-email">Email</label>
                        <input type="email" id="register-email" name="email" autoComplete="current-email" value={email} onChange={(e) => handleInputChange(e)} />
                    </div>
                    <div>
                        <label htmlFor="register-password">Password</label>
                        <input type="password" id="register-password" name="password" autoComplete="current-password" value={password} onChange={(e) => handleInputChange(e)} />
                    </div>
                    <div>
                        <label htmlFor="register-name">name</label>
                        <input type="text" id="register-name" name="name" autoComplete="current-name" value={name} onChange={(e) => handleInputChange(e)} />
                    </div>
                    <input type="submit" value="Register" />
                </form>
            </section>
        </div>
    )
}

export default withRouter(Register);
