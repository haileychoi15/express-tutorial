import React, { createContext, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const initialState = {
    isAuth: false,
    user: []
};

// create context
export const AuthContext = createContext(initialState);

const AuthReducer = (state = {} , action) => {
    switch (action.type) {
        case "AUTH_USER":           
            return {
                ...state,
                isAuth: true,
                user: action.payload
            }
        case "REGISTER_USER":           
            return {
                ...state
            }
        case "LOGIN_USER":           
            return {
                ...state,
                isAuth: true,
                user: action.payload
            }
        case "LOGOUT_USER":           
            return {
                ...state,
                isAuth: false,
                user: []
            };
        default:
            return state;
    }
}

// provider componet
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);
    const history = useHistory();

    async function authUser() {
        try {
            const { data } = await axios.get("/api/users/auth");
            console.log('AuthContext.js authUser : ',data.user);
            dispatch({
                type: "AUTH_USER",
                payload: data.user
            });

        } catch(err) {

        }  
    }

    async function loginUser(email, password) {
        try {
            const { data } = await axios.post("/api/users/login", { email, password });
            dispatch({
                type: "LOGIN_USER",
                payload: data.user
            });

            if (data.loginSuccess) {
                history.push("/");
            }

        } catch(err) {

        }  
    }

    async function registerUser(newUser) {
        try {
            const { data } = await axios.post("/api/users/register", newUser);
            if (data.registerSuccess) {
                history.push("/login");
            }

        } catch(err) {

        }  
    }

    async function logoutUser() {
        try {
            const { data } = await axios.get("/api/users/logout");
            dispatch({
                type: "LOGOUT_USER"
            });

            if (data.logoutSuccess) {
                history.push("/");
            }

        } catch(err) {

        }  
    }

    return (
        <AuthContext.Provider value={{
            isAuth: state.isAuth,
            user: state.user, 
            loginUser,
            registerUser,
            logoutUser,
            authUser
        }   
        }>
            {children}
        </AuthContext.Provider>   
    )
}
