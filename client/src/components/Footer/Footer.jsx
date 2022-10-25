import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='container-footer'>
      <div className='container-interno-footer'>
        <div>Countries App for Travel  <FontAwesomeIcon className='icon-copy-footer' icon={faCopyright}/></div>
        <div><Link to={'/contact'} className='link-contact'>Contact Us</Link></div>
        <div>2022</div>
      </div>
    </div>
  )
}

export default Footer