import React from 'react';
import SingleArticle from '../single-article'

function Article (match){
    console.log(match.match.url.substr(10));
    let method = match.match.url.substr(10);
    return(
        <SingleArticle method={method}/>
    );
}

export default Article;