import React, { createContext, useReducer } from 'react';
import axios from 'axios';

const initialState = {
    articles: [],
    error: null,
    loading: true
}

// create context
export const ArticleContext = createContext(initialState);

// article reducer
const ArticleReducer = (state, action) => {
    switch (action.type) {
        case "GET_ARTICLES":           
            return {
                ...state,
                loading: false,
                articles: action.payload
            }
        case "DELETE_ARTICLE":      
            return {
                ...state, 
                articles: state.articles.filter(article => article._id !== action.payload)
            }     
        case "ADD_ARTICLE":     
            return {
                ...state, 
                articles: state.articles.concat(action.payload)
            }      
        case "ERROR":           
            return {
                ...state,
                error: action.payload
            }
        default:
            return state.articles;
    }
}

// provider componet
export const ArticleProvider = ({ children }) => {

    const [state, dispatch] = useReducer(ArticleReducer, initialState);

    // actions
    async function getArticles() {
        try {
            const { data : { data } } = await axios.get("/api/articles");
            //console.log('ArticleContext.js : ', data);
            dispatch({
                type: "GET_ARTICLES",
                payload: data
            });
        } catch(err) {
            dispatch({
                type: "ERROR",
                payload: err.response.data.error
            });
        }
    }

    async function deleteArticle(id) {
        try {
            await axios.delete(`/api/articles/${id}`);
            dispatch({
                type: "DELETE_ARTICLE",
                payload: id
            });
        } catch(err) {
            dispatch({
                type: "ERROR",
                payload: err.response.data.error
            });
        }
    }

    async function addArticle(article) {
        const config = {
            headers: {
                "Content-Type": "application/json" 
            }
        }
        try {
            const { data : { data } } = await axios.post("/api/articles", article, config);
            dispatch({
                type: "ADD_ARTICLE",
                payload: data
            });
        } catch(err) {
            dispatch({
                type: "ERROR",
                payload: err.response.data.error
            });
        }
    }

    return (
        <ArticleContext.Provider value={{
            articles: state.articles, 
            error: state.error,
            loading: state.loading,
            getArticles,
            deleteArticle,
            addArticle
        }}>
            {children}
        </ArticleContext.Provider>   
    )
}