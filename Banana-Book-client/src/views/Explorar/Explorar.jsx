import React from 'react'
import './Explorar.css'

import FilterBar from './Components/FilterBar/FilterBar';
import Feed from './Components/Feed/Feed';

export const Explorar = () => {
  return (
    <section className='explorar-page'>
        <FilterBar/>
        <Feed/>
    </section>
  )
}

export default Explorar;
