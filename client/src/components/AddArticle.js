import React, { useContext, useState } from 'react';
import { ArticleContext } from 'context/ArticleContext';

function AddArticle() {

    const { addArticle } = useContext(ArticleContext);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        if(name === "title") {
            setTitle(value);
        }
        else if(name === "content"){
            setContent(value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newArticle = {
            title,
            content
        };

        addArticle(newArticle);
    }

    return (
        <div>
            <form action="" onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="article-title">제목</label>
                    <input type="text" id="article-title" name="title" value={title} onChange={(e) => handleInputChange(e)} />
                </div>
                <div>
                    <label htmlFor="article-content">내용</label>
                    <input type="text" id="article-content" name="content" value={content} onChange={(e) => handleInputChange(e)} />
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default AddArticle
