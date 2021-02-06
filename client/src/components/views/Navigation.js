import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from 'context/AuthContext'; 

function Navigation() {

    const { user, logoutUser } = useContext(AuthContext);
    console.log('Navigation.js user: ', user);

    return (
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
                <li>
                    <button onClick={logoutUser}>logout</button>
                </li>
            </ul>
        </div>
    )
}

export default Navigation
