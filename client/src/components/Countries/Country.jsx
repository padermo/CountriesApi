import React from 'react'

function Country({ image, name, continent }) {
  return (
    <div className='container-country'>
      <div className='container-interno-country'>
        <img className='img-country' src={image} alt={`Imagen de la bandera de ${name}`} />
        <h1 className='name-country'>{name.toUpperCase()}</h1>
        <h2 className='continent-country'>Continent - {continent}</h2>
      </div>
    </div>
  )
}

export default Country