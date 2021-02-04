import React, { createContext, useReducer } from 'react';

const initialState = false;

// create context
export const LoginContext = createContext(initialState);

const LoginReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":           
            return true;
        case "LOGOUT":           
            return false;
        default:
            return state;
    }
}

// provider componet
export const LoginProvider = ({ children }) => {
    const [state, dispatch] = useReducer(LoginReducer, initialState);
    return (
        <LoginContext.Provider value={state}>
            {children}
        </LoginContext.Provider>   
    )
}
