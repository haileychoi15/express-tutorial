import React, { createContext, useReducer } from 'react';

const initialState = [
    {
        id: 1,
        title: "first article",
        content: "first bla bla",
    },
    {
        id: 2,
        title: "second article",
        content: "second bla bla",
    },
    {
        id: 3,
        title: "third article",
        content: "third bla bla",
    },
];

// create context
export const ArticleContext = createContext(initialState);

// article reducer
const ArticleReducer = (state, action) => {
    switch (action.type) {
        case "DELETE_ARTICLE":           
            return state.filter(article => article.id !== action.payload);
        case "ADD_ARTICLE":           
            return state.concat(action.article); // [...state, action.article];
        default:
            return state;
    }
}

// provider componet
export const ArticleProvider = ({ children }) => {

    const [state, dispatch] = useReducer(ArticleReducer, initialState);

    // actions
    function deleteArticle(id) {
        dispatch({
            type: "DELETE_ARTICLE",
            payload: id
        });
    }

    function addArticle(article) {
        dispatch({
            type: "ADD_ARTICLE",
            payload: article
        });
    }

    return (
        <ArticleContext.Provider value={{
            articles: state, 
            deleteArticle,
            addArticle
        }}>
            {children}
        </ArticleContext.Provider>   
    )
}