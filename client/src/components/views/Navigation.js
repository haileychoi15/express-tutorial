import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from 'context/AuthContext'; 

function Navigation() {

    const { loggedIn, logoutUser } = useContext(AuthContext);

    return (
        <div>
            {loggedIn
            ? 
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <button onClick={logoutUser}>logout</button>
                </li>
            </ul>
            :
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
            </ul>
            }
        </div>
    )
}

export default Navigation
