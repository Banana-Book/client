import Register from '../Register/Register'
import Login from '../Login/Login'

import {Route, Routes, Navigate} from 'react-router-dom'

import React from 'react'

export const AuthView = () => {
  return (
    <div>
        <Routes>
            <Route path='signin' element={<Login/>}/>
            <Route path='signup' element={<Register/>}/>
            <Route path='*' element={<Navigate to='/not-found'/>} />
        </Routes>
    </div>
  )
}

export default AuthView;