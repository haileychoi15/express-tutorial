import React, { useEffect, useContext } from 'react'
import { AuthContext } from "context/AuthContext";
import { useHistory } from "react-router-dom";

export default function Auth (Component, option, adminRoute = null) {

    //option
    // null => 아무나 출입 가능
    //1. true => 로그인한 유저만 가능
    //2. false => 로그인한 유저는 불가능

    function AuthficationCheck () {

        const { authUser } = useContext(AuthContext);
        const history = useHistory();

        const handleRoutes = (loggedIn, isAdmin) => {
           
            if(loggedIn) {
                if(adminRoute && !isAdmin) {
                    history.push("/");
                } 
                else {
                    if(!option) history.push("/");
                }
            }
            else {
                if(option) history.push("/login");
            }
        }
        
        useEffect(() => {
            authUser(({ loggedIn, isAdmin }) => {
                console.log('hoc auth.js loggedIn, ',loggedIn);
                handleRoutes(loggedIn, isAdmin);
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return (
            <Component />
        )
    }

    return AuthficationCheck;
}

