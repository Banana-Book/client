import React, { useContext } from 'react';
import './Header.css';
import Logo from '../../assets/img/BananaCut.png';
import { useState, useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Header = () => {
  const { isAunthenticated } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
        console.log(menuRef.current);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }
  },[]);
  return (
    <header>
      <div id="logo-container-header">
        <figure id="imagen-header">
          <img src={Logo} alt="logo-banana" />
        </figure>
        <h1 className="logo">Banana Book</h1>
      </div>
      <nav id="main-nav">
        <ul>
          {!isAunthenticated ? (
            <>
              <li>
                <Link to={'/'}> Inicio </Link>
              </li>
              <li>
                <Link to={'/explorar'}> Explorar </Link>
              </li>
              <li className="login">
                <Link to={'/auth/signin'}> Iniciar Sesion </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={'/'}> Inicio </Link>
              </li>
              <li>
                <Link to={'/explorar'}> Explorar </Link>
              </li>
              <li className="login">
              <div className='menu-container' ref={menuRef}>
              <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
              <button> Cuenta </button>
              </div>
              <div className={`menu-content ${open? 'active' : 'inactive'}`} >
                    <ul>
                      < DropdownItem />
                        </ul>
                        </div>
                        </div>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

function DropdownItem(props){

  const logOut = () => {
  localStorage.clear();
  }

  return(
  <li className='dropdownItem'>
  <Link to={'/profile'}>Mi perfil</Link>
  <Link to={'/newpost'}>Nueva Publicación</Link>
  <Link to={'/auth/signin'} onClick={logOut}>Cerrar Sesión</Link>
  </li>

  )
};
export default Header;
