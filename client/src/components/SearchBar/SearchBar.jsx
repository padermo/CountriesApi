import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountry } from '../../redux/actions';
import { Link } from 'react-router-dom';

function SearchBar() {
  let dispatch = useDispatch();
  let state = useSelector(state => state.countries);
  
  let countryName = state.map(e => e.name);

  const [captureInput, setCaptureInput] = useState("");

  const obtainInputValue = (e) => {
    setCaptureInput(e.target.value)
  }

  const sendValueInput = () => {
    if (captureInput === "") {
      alert("No hay datos a buscar")
    } else {
      if (countryName.includes(captureInput)) {
        dispatch(getCountry(captureInput))
      } else {
        alert("Country no encontrado")
      }
    }
  }

  return (
    <div className='container-searchbar'>
      <div className='border-search'>
        <input className='input-search' type="text" placeholder='Buscar...' onChange={obtainInputValue} />
        <button className='btn-search' onClick={sendValueInput} ><Link to={'/activities' || '/' ? '/countries' : ''} className='link-countries-btn'>Buscar</Link></button>
      </div>
    </div>
  )
}

export default SearchBar