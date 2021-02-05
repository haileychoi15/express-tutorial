import React, { createContext, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const initialState = {};

// create context
export const UserContext = createContext(initialState);

const UserReducer = (state = {} , action) => {
    switch (action.type) {
        case "AUTH_USER":           
            return {
                ...state,
                userData: action.payload
            }
        case "REGISTER_USER":           
            return {
                ...state,
                register: action.payload
            }
        case "LOGIN_USER":           
            return {
                ...state,
                login: action.payload
            }
        case "LOGOUT_USER":           
            return {};
        case "ERROR":           
            return action.payload;
        default:
            return state;
    }
}

// provider componet
export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, initialState);
    const history = useHistory();

    async function loginUser(email, password) {
        try {
            const { data } = await axios.post("/api/users/login", { email, password });
            console.log('UserContext.js login : ',data);
            dispatch({
                type: "LOGIN_USER",
                payload: data
            });

            if (data.loginSuccess) {
                history.push("/");
            }

        } catch(err) {
            dispatch({
                type: "ERROR",
                payload: err
            });
        }  
    }

    async function authUser() {
        try {
            const { data } = await axios.get("/api/users/auth");
            console.log('UserContext.js auth : ',data);
            dispatch({
                type: "AUTH_USER",
                payload: data
            });

        } catch(err) {
            dispatch({
                type: "ERROR",
                payload: err
            });
        }  
    }

    return (
        <UserContext.Provider value={{
            user: state, 
            loginUser,
            authUser
        }   
        }>
            {children}
        </UserContext.Provider>   
    )
}
