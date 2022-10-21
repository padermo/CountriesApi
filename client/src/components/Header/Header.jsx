import React from 'react'
import NavBar from '../SearchBar/NavBar'

function Header() {
  return (
    <div className='container-header'>
      <img className='img-header' src={""} alt="" />
      <div className='container-header-navbar'>
        <NavBar/>
      </div>
    </div>
  )
}

export default Header