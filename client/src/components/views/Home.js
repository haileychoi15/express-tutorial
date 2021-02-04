import React from 'react';
import ArticleList from 'components/ArticleList';
import AddArticle from 'components/AddArticle';

function Home() {

    return (
        <div>
            <AddArticle />
            <ArticleList />
        </div>
    )
}

export default Home

