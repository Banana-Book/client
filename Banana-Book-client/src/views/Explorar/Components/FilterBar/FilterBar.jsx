import React from 'react';
import { useState, useEffect } from 'react';
import './FilterBar.css';

export const FilterBar = ({ onFilterChange }) => {
  const [category, setCategories] = useState([]);
  const [price, setPrice] = useState('');
  const [condition, setConditions] = useState([]);

  useEffect(() => {
    handleSearch();
  }, [price, category, condition]);

  const toggleCategory = (category) => {
    setCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category],
    );
  };
  const toggleCondition = (condition) => {
    setConditions((prevConditions) =>
      prevConditions.includes(condition)
        ? prevConditions.filter((cond) => cond !== condition)
        : [...prevConditions, condition],
    );
  };
  const handleSearch = () => {
    onFilterChange({
      category,
      price,
      condition,
    });
  };
  return (
    <nav className="Filterbar">
      <form method="get" className="filter-form">
        <h3> Filtros </h3>
        <hr />
        <div className="filter-container">
          <h4>Temática:</h4>

          <label className="materiaLbl">
            Matematica
            <input type="checkbox" value="calculo" onChange={() => toggleCategory('matematica')} />
            <span className="checkmark"></span>
          </label>

          <label className="materiaLbl">
            Ciencia
            <input type="checkbox" value="fisica" onChange={() => toggleCategory('ciencias')} />
            <span className="checkmark"></span>
          </label>

          <label className="materiaLbl">
            Programación
            <input type="checkbox" value="politica" onChange={() => toggleCategory('programacion')} />
            <span className="checkmark"></span>
          </label>
          <label className="materiaLbl">
            Idiomas
            <input type="checkbox" value="politica" onChange={() => toggleCategory('idiomas')} />
            <span className="checkmark"></span>
          </label>
          <label className="materiaLbl">
            Otros
            <input type="checkbox" value="politica" onChange={() => toggleCategory('otros')} />
            <span className="checkmark"></span>
          </label>

          <h4>Condicion:</h4>
          <label className="condicionLbl">
            Nuevo
            <input type="checkbox" value="como nuevo" onChange={() => toggleCondition('como nuevo')} />
            <span className="checkmark"></span>
          </label>
          <label className="condicionLbl">
            Buena
            <input type="checkbox" value="buena" onChange={() => toggleCondition('buena')} />
            <span className="checkmark"></span>
          </label>
          <label className="condicionLbl">
            Mala
            <input type="checkbox" value="mala" onChange={() => toggleCondition('mala')} />
            <span className="checkmark"></span>
          </label>

          <h4>Precio maximo: </h4>
          <input
            type="number"
            placeholder="Max - $"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
      </form>
    </nav>
  );
};

export default FilterBar;
