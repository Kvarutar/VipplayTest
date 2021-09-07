import React from 'react';
import './app.css';
import Header from '../header';
import Footer from '../footer';
import {DiffPages, Article} from '../pages';
import '../../fonts/stylesheet.css';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';


class App extends React.Component{
    render(){
        return(
            <Router>
                <div>
                    <div className="page__wrapper">
                        <Header/>
                        <Route path='/:tag' exact component={DiffPages}/>
                        <Route path='/articles/:tag' exact component={Article}/>
                    </div>
                    <Footer/>
                </div>
            </Router>
        )
    }
}

export default App;