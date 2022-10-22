import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-regular-svg-icons'

function Footer() {
  return (
    <div className='container-footer'>
      <div className='container-interno-footer'>
        <div>Footer Countries  <FontAwesomeIcon className='icon-copy-footer' icon={faCopyright}/></div>
        <div>2022</div>
      </div>
    </div>
  )
}

export default Footer