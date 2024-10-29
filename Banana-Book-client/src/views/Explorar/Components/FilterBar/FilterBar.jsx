import React from 'react'
import { useState, useEffect } from 'react';
import './FilterBar.css'

export const FilterBar = () => {

    const [maxPriceField, setPrice] = useState('');

  return (
    <nav className="Filterbar">
        <form method="get" className="filter-form">
            <h3> Filtros </h3>
            <hr/>
            <div className="filter-container">
                <h4>Materia :</h4>

                <label className="materiaLbl">Calculo
                    <input type="checkbox" value="calculo"/>
                    <span className="checkmark"></span>
                </label>
                
                <label className="materiaLbl">Fisica
                    <input type="checkbox" value="fisica"/>
                    <span className="checkmark"></span>
                </label>
                
                <label className="materiaLbl">Politica
                    <input type="checkbox" value="politica"/>
                    <span className="checkmark"></span>
                </label>

                <h4>Condicion :</h4>

                <label className="condicionLbl">Nuevo
                    <input type="checkbox" value="nuevo"/>
                    <span className="checkmark"></span>
                </label>
                
                <label className="condicionLbl">Usado
                    <input type="checkbox" value="usado"/>
                    <span className="checkmark"></span>
                </label>

                <h4>Precio maximo: </h4>
                <input 
                    type='number'
                    placeholder="Max - $"
                    value={maxPriceField}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>
        </form>
    </nav>
  )
}

export default FilterBar;