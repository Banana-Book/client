import React from 'react'

import "./BananaPP.css"
import LogoMinimalista from "../../../../assets/img/Logo-minimalista.png"

export const BananaPP = () => {
  return (
    <div>
        <div className='logo-circular'>
            <img src={LogoMinimalista} alt="Banana simple"/> 
        </div>
    </div>
  )
}

export default BananaPP;