import React from 'react';
import './header.sass';
import logo from './logo.svg';
import {Link} from 'react-router-dom';

const Header = () => {
    return(
        <div className="header">
            <div className="header__left">
                <img src={logo}/>
                <div className="header__line"></div>
                <p className="header__blog">блог</p>
            </div>
            <div className="header__right">
                <Link to='/chto-posmotret' className="header__link">Что посмотреть</Link>
                <Link to='/longridy' className="header__link">Лонгриды</Link>
                <Link to='/brjus-uillis' className="header__link">Брюс Уиллис</Link>
            </div>
        </div>
    );
}

export default Header;