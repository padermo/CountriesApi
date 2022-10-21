import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCountry } from '../../redux/actions';

function SearchBar() {
  let dispatch = useDispatch();

  const [captureInput, setCaptureInput] = useState("");

  const obtainInputValue = (e) => {
    setCaptureInput(e.target.value)
  }

  const sendValueInput = () => {
    dispatch(getCountry(captureInput))
  }

  return (
    <div className='container-searchbar'>
      <div className='border-search'>
        <input className='input-search' type="text" placeholder='Buscar...' onChange={obtainInputValue} />
        <button className='btn-search' onClick={sendValueInput} >Buscar</button>
      </div>
    </div>
  )
}

export default SearchBar