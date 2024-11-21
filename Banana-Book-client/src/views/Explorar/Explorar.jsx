import React, { useState } from 'react'
import './Explorar.css'

import FilterBar from './Components/FilterBar/FilterBar';
import Feed from './Components/Feed/Feed';

export const Explorar = () => {
  const [filters, setFilters] = useState({
    categories: [],
    price: '',
    condition: []
  });

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({
        ...prevFilters,
        ...newFilters,
    }));
  };

  return (
    <section className='explorar-page'>
        <FilterBar onFilterChange={handleFilterChange}/>
        <Feed filters={filters}/>
    </section>
  )
}

export default Explorar;
