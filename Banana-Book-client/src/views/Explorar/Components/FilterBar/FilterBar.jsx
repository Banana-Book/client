import React from 'react'
import { useState, useEffect } from 'react';
import './FilterBar.css'

export const FilterBar = ({ onFilterChange }) => {

    const [categories, setCategories] = useState([]);
    const [price, setPrice] = useState('');
    const [condition, setConditions] = useState([]);

    const toggleCategory = (category) => {
        setCategories((prevCategories) =>
            prevCategories.includes(category)
                ? prevCategories.filter((cat) => cat !== category)
                : [...prevCategories, category]
        );
    };
    const toggleCondition = (condition) => {
        setConditions((prevConditions) =>
            prevConditions.includes(condition)
                ? prevConditions.filter((cond) => cond !== condition)
                : [...prevConditions, condition]
        );
    };
    const handleSearch = () => {
        onFilterChange({
            categories,
            price,
            condition,
        });
    };
    return (
        <nav className="Filterbar">
            <form method="get" className="filter-form">
                <h3> Filtros </h3>
                <hr/>
                <div className="filter-container">
                    <h4>Materia:</h4>

                    <label className="materiaLbl">Calculo
                        <input type="checkbox" value="calculo" onChange={() => {
                            toggleCategory('calculo');
                            handleSearch();
                        }}/>
                        <span className="checkmark"></span>
                    </label>
                    
                    <label className="materiaLbl">Fisica
                        <input type="checkbox" value="fisica" onChange={() => {
                            toggleCategory('fisica')
                            handleSearch();    
                        }}/>
                        <span className="checkmark"></span>
                    </label>
                    
                    <label className="materiaLbl">Politica
                        <input type="checkbox" value="politica" onChange={() => {
                            toggleCategory('politica')
                            handleSearch();    
                        }}/>
                        <span className="checkmark"></span>
                    </label>

                <h4>Condicion:</h4>

                    <label className="condicionLbl">Nuevo
                        <input type="checkbox" value="nuevo" onChange={() => {
                            toggleCondition('nuevo')
                            handleSearch();    
                        }}/>
                        <span className="checkmark"></span>
                    </label>
                    
                    <label className="condicionLbl">Usado
                        <input type="checkbox" value="usado" onChange={() => {
                            toggleCondition('usado')
                            handleSearch();    
                        }}/>
                        <span className="checkmark"></span>
                    </label>

                    <h4>Precio maximo: </h4>
                    <input 
                        type='number'
                        placeholder="Max - $"
                        value={price}
                        onChange={(e) => {
                            setPrice(e.target.value)
                            handleSearch();    
                        }}
                    />
                </div>
            </form>
        </nav>
    )
}

export default FilterBar;