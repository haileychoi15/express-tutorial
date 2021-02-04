import React, { useContext, useState } from 'react';
import { ArticleContext } from 'context/ArticleContext';

function AddArticle() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    
    const handleInputChange = () => {

    }

    return (
        <div>
            <form action="">
                <div>
                    <label htmlFor="article-title">제목</label>
                    <input type="text" id="article-title" value={title} onChange={() => handleInputChange(e.target)} />
                </div>
            </form>
        </div>
    )
}

export default AddArticle
