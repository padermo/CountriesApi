import React, {useState} from 'react'
import SearchBar from './SearchBar'
import {Link} from 'react-router-dom'

function NavBar() {
  return (
    <div className='container-navbar'>
      <div className='container-btn-navbar'>
        <Link to={'/'}>
          <button className='btn-nav'><span>A</span>bout Us</button>
        </Link>
        <Link to={'/countries'}>
          <button className='btn-nav'><span>C</span>ountries</button>
        </Link>
        <Link to={'/activities'}>
          <button className='btn-nav'><span>A</span>ctivities</button>
        </Link>
      </div>
      <div>
        <SearchBar />
      </div>
    </div>
  )
}

export default NavBar