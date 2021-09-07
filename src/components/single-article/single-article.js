import React,{useEffect, useState} from 'react';
import Spinner from '../spinner';
import './single-article.sass';
import left from './left.svg';
import right from './right.svg';
import {Link} from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function SingleArticle ({method}){
    const [articleConent, setArticalContent] = useState([]),
          [title, setTitle] = useState(''),
          [tags, setTags] = useState([]),
          [date, setDate] = useState(''),
          [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`https://api.blog.vipplay.ru/wp-json/vip/v1/articles/${method}`)
        .then(res => res.json())
        .then((char) => {loadArticles(char)})
        .catch()
        return function cleanup() {
            cleanArticles()
        };
    }, [method])

    function loadArticles(char) {
        setArticalContent(char.content);
        setTitle(char.title);
        setTags(char.tags);
        setLoading(false);
        setDate(char.date);
    }

    function cleanArticles() {
        setArticalContent([]);
        setTitle('');
        setTags([]);
        setLoading(true);
        setDate('');
    }

    function getRandomId(max = 123, min = 97){
        let randId = '';
        for (let i = 0; i < 5; i++){
            let rand = Math.round((min - 0.5 + Math.random() * (max - min + 1)));
            randId += String.fromCharCode(rand);
        }
        return randId;
    }

    function renderArticle(arr){
        return arr.map(item => {
            if (item.name.indexOf('paragraph') > -1){
                let paragraph = item.text;
                /* console.log();
                console.log(item.text.substr(3, item.text.length-7)); */
                return(
                    
                    <div key={getRandomId()} className="article-single__paragraph" dangerouslySetInnerHTML={{__html: paragraph}}></div>

                )
            }else if (item.name.indexOf('image') > -1){
                let caption = (item.caption) ? <p className="article-single__img-caption">{item.caption}</p> : '';
                return(
                    <div className="article-single__img" key={getRandomId()}>
                        <img src={item.link}></img>
                        {caption}
                        <p className="article-single__img-copyright">{item.copyright}</p>
                    </div>
                )
            }else if (item.name.indexOf('heading') > -1){
                return(
                    <h2 className="article-single__heading" key={getRandomId()}>{item.text}</h2>
                )
            }else if (item.name.indexOf('quote') > -1){
                return(
                    <div className="article-single__quote" key={getRandomId()}>
                        <p className="article-single__quote-text">{item.text}</p>
                        <p className="article-single__quote-author" >{item.author}</p>
                    </div>
                )
            }else if (item.name.indexOf('gallery') > -1){
                let settings = {
                    dots: true,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                    nextArrow: <SampleNextArrow />,
                    prevArrow: <SamplePrevArrow />
                }
                return(
                    <div className='article-single__slider'>
                        <Slider {...settings}>
                            {renderSlider(item.links)}
                        </Slider>
                    </div>
                )
            }
        })
    }

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div className={className}
            onClick={onClick}
            >
            <img src={right} ></img>
        </div>
        );
      }
      
      function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div className={className}
                onClick={onClick}
                >
                <img src={left} ></img>
            </div>
        );
      }

    function renderSlider(arr){
        return arr.map((item) => {
            return(
                <div key={getRandomId()}>
                    <img className="article-single__slider-item" src={item}></img>
                </div>
            )
        })
    }

    function renderTags(arr){
        return arr.map((item) => {
            let link = '../' + item.slug;
            return(
                <Link to={link} className="article-single__tags-item" key={getRandomId()}>
                    {item.name}
                </Link>
            )
        })
    }

    if (loading) {
        return (
            <Spinner/>
        )
    }

    let content = renderArticle(articleConent),
        tagsContent = renderTags(tags);
    return(
        <div className="article-single">
            <p className="article-single__date">{date}</p>
            <h1 className="article-single__title">{title}</h1>
            <div className="article-single__content">
                {content}
            </div>
            <div className="article-single__tags">
                {tagsContent}
            </div>
        </div>
    )
}

export default SingleArticle;