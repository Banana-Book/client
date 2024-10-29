import React from "react";
import './HomePage.css';
import MainContainer from "./MainContainer/MainContainer";
import BarraBusqueda from "./BarraBusqueda/BarraBusqueda";

const HomePage = () => {
    return (
        <div className="home-page">
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#FFF3C9" fillOpacity="1" d="M0,32L48,48C96,64,192,96,288,122.7C384,149,480,171,576,170.7C672,171,768,149,864,133.3C960,117,1056,107,1152,112C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg> */}
        <MainContainer/>
        <BarraBusqueda/>
        </div>
    );
};

export default HomePage;