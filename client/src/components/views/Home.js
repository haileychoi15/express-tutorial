import React, { useEffect } from 'react';
import axios from 'axios';
import ArticleList from 'components/ArticleList';

function Home() {
    
    useEffect(() => {
        axios.get('/api/hello')
             .then((res) => console.log(res.data));
    }, []);

    return (
        <div>
            <ArticleList />
        </div>
    )
}

export default Home

