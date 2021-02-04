import React, { useContext } from 'react';
import { ArticleContext } from 'context/ArticleContext';

function Article({ article }) {

    const { deleteArticle } = useContext(ArticleContext);

    return (
        <li>
            <h1>{article.title}</h1>
            <p>{article.content}</p>
            <button onClick={() => deleteArticle(article._id)}>삭제</button>
        </li>
    )
}

export default Article
