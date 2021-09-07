import React, {useEffect, use} from 'react';
import './all-articles.css';
import clock from './clock.svg';
import Spinner from '../spinner'

class GetAllArticles extends React.Component{

    state = {
        artList: [],
        title: '',
        totalcount: 0,
        loading: true,
    }

    offset = 24
    componentDidMount() {
        this.setState({
            loading: true,
        })
        fetch(`https://api.blog.vipplay.ru/wp-json/vip/v1/articles/${this.props.method}per_page=24`)
        .then(res => res.json())
        .then((char) => {
            this.setState({
                artList: char.articles,
                title: char.readable_tagname,
                totalcount: +char.totalcount,
                loading: false,
            })
        })
        .catch()
    }

    componentDidUpdate() {
        fetch(`https://api.blog.vipplay.ru/wp-json/vip/v1/articles/${this.props.method}per_page=24`)
        .then(res => res.json())
        .then((char) => {
            if (char.readable_tagname !== this.state.title){
                this.setState({
                    artList: char.articles,
                    title: char.readable_tagname,
                    totalcount: char.totalcount,
                    loading: false,
                })
                this.offset = 24
            }
        })
        .catch()
    }

    componentWillUnmount(){
        this.setState({
            artList: [],
            title: '',
            loading: true,
        })
    }

    onMoreArticles() {
        fetch(`https://api.blog.vipplay.ru/wp-json/vip/v1/articles/${this.props.method}per_page=24&offset=${this.offset}`)
            .then(res => res.json())
            .then((char) => {
                let tmparr = [...this.state.artList, ...char.articles];
                this.setState({
                    artList: tmparr,
                })
                this.offset += 24;
            })
            .catch()
    }

    getRandomId(max = 123, min = 97){
        let randId = '';
        for (let i = 0; i < 5; i++){
            let rand = Math.round((min - 0.5 + Math.random() * (max - min + 1)));
            randId += String.fromCharCode(rand);
        }
        return randId;
    }

    renderArticles(arr){
        return arr.map((item) => {
            const {title, image, read, date, size, slug} = item;
            let classImg = "article__img_wrapper article__img_wrapper--" + size;
            return(
                <li
                    key={this.getRandomId()}
                    className="article-item">
                    <a href="#">
                        <div className={classImg} >
                            <img className="article__img" src={image}></img>
                        </div>
                        <div className="article__info">
                            <p className="article__date">{date}</p>
                            <img src={clock}></img>
                            <p className="article__read">{read}</p>
                        </div>
                        <p className="article__title">{title}</p>
                    </a>
                </li>
            )
        })
    }

    renderCols(arr){
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
                     key={this.getRandomId()}>
                    {item}
                </div>
            )
        })
    }

    render() {
        const {artList, title, totalcount, loading} = this.state
        const content = this.renderArticles(artList);
        let test = this.renderCols(content);

        if (window.innerWidth < 1366 && window.innerWidth > 1024){
            test = this.renderCols(content);
        }else if(window.innerWidth < 1024 && window.innerWidth > 768){
            test = this.renderCols(content);
        } else if(window.innerWidth < 768){
            test = this.renderCols(content);
        }

        let button = (totalcount > 24 && artList.length < totalcount && artList.length > 0) ? <button className='more_btn' onClick={ () => this.onMoreArticles()}>Больше статей</button> : '';

        console.log(loading);
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
}
    


export default GetAllArticles;