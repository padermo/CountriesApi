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
    <div>
      <div>
        <input type="text" placeholder='Buscar...' onChange={obtainInputValue} />
        <button onClick={sendValueInput} >Buscar</button>
      </div>
    </div>
  )
}

export default SearchBar