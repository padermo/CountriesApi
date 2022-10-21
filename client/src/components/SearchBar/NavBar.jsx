import React, {useState} from 'react'
import SearchBar from './SearchBar'
import {Link} from 'react-router-dom'

function NavBar() {
  const [visibility, setVisibility] = useState('visible')

  const countriesClick = (e) => {
    if (e.target.value !== 'countries') {
      setVisibility('hidden')
    } else {
      setVisibility('visible')
    }
  }

  return (
    <div className='container-navbar'>
      <div className='container-btn-navbar'>
        <Link to={'/'}>
          <button className='btn-nav' value='about' onClick={countriesClick}><span>A</span>bout Us</button>
        </Link>
        <Link to={'/countries'}>
          <button className='btn-nav' value='countries' onClick={countriesClick}><span>C</span>ountries</button>
        </Link>
        <Link to={'/activities'}>
          <button className='btn-nav' value='activities' onClick={countriesClick}><span>A</span>ctivities</button>
        </Link>
      </div>
      <div style={{visibility: `${visibility}`}}>
        <SearchBar />
      </div>
    </div>
  )
}

export default NavBar