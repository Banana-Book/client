import React, {useState} from "react";
import './BarraBusqueda.css';
import { useNavigate } from "react-router-dom";

import SearchIcon from '../../../assets/img/search-alt.svg';
const BarraBusqueda = () => {
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
    const search = (e) => {
        e.preventDefault();
        navigate(`/explorar?search=${encodeURIComponent(searchValue)}`);
    }
    return (
        <form onSubmit={search}>
            <div className="barra-buscar">
                <input type="search" placeholder="Busca tu banana libro" className="buscar" name="buscar" value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}} />
                <button type="submit" className="buscar-btn">
                    <img src={SearchIcon} alt="busqueda" />
                </button>
            </div>
        </form>
    );
};

export default BarraBusqueda;