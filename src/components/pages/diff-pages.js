import React from 'react';
import GetAllArticles from '../all-articles';

function DiffPages (match) {
    console.log(match.match.url.substr(1));
    let method = `?tag=${match.match.url.substr(1)}&`;
    return(
        <GetAllArticles method={method}/> 
    )
}

export default DiffPages;