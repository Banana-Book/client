import React from "react";
import './MainContainer.css';
import Banana from '../../../assets/img/banana.png';

const MainContainer = () => {
    return (
        <div className="content-container">
            <h1>Encuentra, explora, <br /> y difunde el <br /> conocimiento</h1>
            <figure className="logo-landing">
                <img src={Banana} alt="logo-2" />
            </figure>
        </div>
    );
};

export default MainContainer;