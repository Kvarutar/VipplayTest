import React from 'react';
import rocket from './Rocket.gif'
import './spinner.css'

const Spinner = () => {
    return (
        <div className="spinner">
            {/* <img src={rocket} alt="spinner"/> */}
            <div className="loader"></div>
        </div>
    )
}

export default Spinner;