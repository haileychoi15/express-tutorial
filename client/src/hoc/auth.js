import React, { useEffect, useContext } from 'react'
import { AuthContext } from "context/AuthContext";
import { useHistory } from "react-router-dom";

export default function Auth (Component, option, adminRoute = null) {

    //option
    //1. true => 로그인한 유저만 가능
    //2. false => 로그인한 유저는 불가능

    function AuthficationCheck () {

        const { user, authUser } = useContext(AuthContext);
        const history = useHistory();

        const handleRoutes = (loggedIn) => {
            if(loggedIn) {
                if(adminRoute && !user.isAdmin) {
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
            authUser(({ loggedIn }) => {
                console.log('hoc auth.js loggedIn, ',loggedIn);
                handleRoutes(loggedIn);
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return (
            <Component />
        )
    }

    return AuthficationCheck;
}

