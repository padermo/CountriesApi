import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCountryName } from '../../redux/actions';

function SearchBar() {
  let dispatch = useDispatch();

  const [captureInput, setCaptureInput] = useState("");

  const obtainInputValue = (e) => {
    setCaptureInput(e.target.value)
  }

  const sendValueInput = () => {
    dispatch(getCountryName(captureInput))
    console.log(captureInput)
  }

  return (
    <div>
      <div>
        <input type="text" placeholder='Buscar...' onChange={obtainInputValue} />
        <button onClick={sendValueInput}>Buscar</button>
      </div>
    </div>
  )
}

export default SearchBar