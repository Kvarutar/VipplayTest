import React,{useEffect, useState} from 'react';
import './all-articles.sass';
import clock from './clock.svg';
import Spinner from '../spinner';
import {Link} from 'react-router-dom';

function GetAllArticles({method}){

    const [artList, setArtList] = useState([]),
          [title, setTitle] = useState(''),
          [totalcount, setTotalcount] = useState(0),
          [loading, setLoading] = useState(true);

    let offset = 24;

    useEffect(() => {
        setLoading(true);
        fetch(`https://api.blog.vipplay.ru/wp-json/vip/v1/articles/${method}per_page=24`)
        .then(res => res.json())
        .then((char) => {loadArticles(char)})
        .catch()
        return function cleanup() {
            cleanArticles()
        };
    }, [method])

    function loadArticles(char) {
        setArtList(char.articles);
        console.log(artList);
        setTitle(char.readable_tagname);
        setTotalcount(+char.totalcount);
        setTimeout(() => {
            setLoading(false);
        }, 300)
        
    }

    function cleanArticles() {
        setArtList([]);
        console.log('');
        setTitle('');
        setTotalcount(0);
        setLoading(true);
    }


    function onMoreArticles() {
        fetch(`https://api.blog.vipplay.ru/wp-json/vip/v1/articles/${method}per_page=24&offset=${offset}`)
            .then(res => res.json())
            .then((char) => {
                let tmparr = [...artList, ...char.articles];
                setArtList(tmparr);
                offset += 24;
            })
            .catch()
    }

    function getRandomId(max = 123, min = 97){
        let randId = '';
        for (let i = 0; i < 5; i++){
            let rand = Math.round((min - 0.5 + Math.random() * (max - min + 1)));
            randId += String.fromCharCode(rand);
        }
        return randId;
    }

    function renderArticles(arr){
        return arr.map((item) => {
            const {title, image, read, date, size, slug} = item;
            let classImg = "article__img_wrapper article__img_wrapper--" + size,
                link = "/articles/"+slug;
            return(
                <li
                    key={getRandomId()}
                    className="article-item">
                    <Link to={link} className="article__fullPage">
                        <div className={classImg} >
                            <img className="article__img" src={image}></img>
                        </div>
                        <div className="article__info">
                            <p className="article__date">{date}</p>
                            <img src={clock}></img>
                            <p className="article__read">{read}</p>
                        </div>
                        <p className="article__title">{title}</p>
                    </Link>
                </li>
            )
        })
    }

    function renderCols(arr){
        let content = [[]];
        let counter = 0;
        let columns = 3;
        if (window.innerWidth < 1366 && window.innerWidth > 1024){
            columns = 2;
        }else if(window.innerWidth < 1024 && window.innerWidth > 767){
            columns = 1;
        } else if(window.innerWidth < 767){
            columns = 0;
        }

        for (let i = 0; i < columns; i++){
            content.push([]);
        }

        for (let i = 0; i < arr.length; i++){
            content[counter] = [...content[counter], ...arr.slice(i, i+1)]
            counter++;
            if (counter > columns) counter = 0;
        }
        return content.map((item) => {
            return(
                <div className="col" 
                     key={getRandomId()}>
                    {item}
                </div>
            )
        })
    }


    const content = renderArticles(artList);
    let test = renderCols(content);

    if (window.innerWidth < 1366 && window.innerWidth > 1024){
        test = renderCols(content);
    }else if(window.innerWidth < 1024 && window.innerWidth > 768){
        test = renderCols(content);
    } else if(window.innerWidth < 768){
        test = renderCols(content);
    }

    let button = (totalcount > 24 && artList.length < totalcount && artList.length > 0) ? <button className='more_btn' onClick={ () => onMoreArticles()}>Больше статей</button> : '';

    if (loading) {
        return (
            <Spinner/>
        )
    }

    return(
        <div className="main">
            <h1 className="main__title">{title}</h1>
            <ul className="article__wrapper">
                {test}
            </ul>
            {button}
        </div>
    )
    
}
    


export default GetAllArticles;