import React from 'react'

function Country({ image, name, continent }) {
  return (
    <div>
      <div>
        {/* <img src={image} alt={`Imagen de la bandera de ${name}`} /> */}
        <h1>{name}</h1>
        {/* <h2>Continent - {continent}</h2> */}
      </div>
    </div>
  )
}

export default Country