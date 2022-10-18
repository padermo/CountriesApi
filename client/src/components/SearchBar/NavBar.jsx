import React from 'react'
import SearchBar from './SearchBar'
import Countries from '../Countries/Countries'

function NavBar() {
  return (
    <div>
      <div>
        <SearchBar />
      </div>
      <div>
        <Countries />
      </div>
    </div>
  )
}

export default NavBar