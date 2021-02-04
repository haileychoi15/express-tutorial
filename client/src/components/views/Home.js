import React, { useEffect } from 'react';
import axios from 'axios';
import ArticleList from 'components/ArticleList';
import AddArticle from 'components/AddArticle';

function Home() {

    const getArticles = async () => {
        const res = await axios.get('/api/articles');
        console.log(res.data);
    }
    
    useEffect(() => {
        getArticles();
    }, []);

    return (
        <div>
            <AddArticle />
            <ArticleList />
        </div>
    )
}

export default Home

