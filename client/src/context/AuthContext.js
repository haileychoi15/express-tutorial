import React, { createContext, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const initialState = {
    loggedIn: false,
    isAuth: false,
    user: {}
};

// create context
export const AuthContext = createContext(initialState);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "AUTH_USER":           
            return {
                ...state,
                loggedIn: true,
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
                loggedIn: true,
                isAuth: true,
                user: action.payload
            }
        case "LOGOUT_USER":           
            return initialState;
        default:
            return state;
    }
}

// provider componet
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);
    const history = useHistory();

    async function authUser(callback) {
        try {
            const { data } = await axios.get("/api/users/auth");
            
            if(data.authSuccess) {
                dispatch({
                    type: "AUTH_USER",
                    payload: data.user
                });

                return callback({ loggedIn: true });
            } 
            else {
                return callback({ loggedIn: false });
            }

        } catch(err) {
            console.log(err);
        }  
    }

    async function loginUser(email, password) {
        try {
            const { data } = await axios.post("/api/users/login", { email, password });
            console.log(data);

            if (data.loginSuccess) {

                dispatch({
                    type: "LOGIN_USER",
                    payload: data.user
                });

                history.push("/");
            }

        } catch(err) {
            console.log(err);
        }  
    }

    async function registerUser(newUser) {
        try {
            const { data } = await axios.post("/api/users/register", newUser);
            if (data.registerSuccess) {
                history.push("/login");
            }

        } catch(err) {
            console.log(err);
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
            console.log(err);
        }  
    }

    return (
        <AuthContext.Provider value={{
            loggedIn: state.loggedIn,
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
