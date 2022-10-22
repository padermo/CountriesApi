import React from 'react'
import NavBar from '../SearchBar/NavBar'

function Header() {
  return (
    <div className='container-header'>
      <div className="container-img-header">
        <h1><span>C</span>ountries <span>A</span>pp for <span>T</span>ravel</h1>
      </div>
      <div className='container-header-navbar'>
        <NavBar/>
      </div>
    </div>
  )
}

export default Header