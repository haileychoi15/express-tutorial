import React, { useContext, useEffect } from 'react';
import { ArticleContext } from 'context/ArticleContext';
import Article from 'components/Article';

function ArticleList() {

    const { articles, getArticles } = useContext(ArticleContext);
    
    useEffect(() => {
        getArticles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <ul>
                {articles.map(article => 
                    <Article key={article._id} article={article} />
                )}
            </ul>
        </div>
    )
}

export default ArticleList;
