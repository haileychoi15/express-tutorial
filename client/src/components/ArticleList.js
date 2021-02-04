import React, { useContext } from 'react';
import { ArticleContext } from 'context/ArticleContext';
import Article from 'components/Article';

function ArticleList() {

    const { articles } = useContext(ArticleContext);
    
    return (
        <div>
            <ul>
                {articles.map(article => 
                    <Article key={article.id} article={article} />
                )}
            </ul>
        </div>
    )
}

export default ArticleList;
