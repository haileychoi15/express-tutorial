import React, { useEffect } from 'react';
import axios from 'axios';
import ArticleList from 'components/ArticleList';
import AddArticle from 'components/AddArticle';

function Home() {
    
    useEffect(() => {
        axios.get('/api/hello')
             .then((res) => console.log(res.data));
    }, []);

    return (
        <div>
            <AddArticle />
            <ArticleList />
        </div>
    )
}

export default Home

