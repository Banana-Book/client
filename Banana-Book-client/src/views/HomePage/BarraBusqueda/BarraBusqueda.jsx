import React from "react";
import './BarraBusqueda.css';
import SearchIcon from '../../../assets/img/search-alt.svg';

const BarraBusqueda = () => {
    return (
        <div className="barra-buscar">
            <input type="search" placeholder="Busca tu banana libro" className="buscar" />
            <a href="#">
                <img src={SearchIcon} alt="busqueda" />
            </a>
        </div>
    );
    };

export default BarraBusqueda;