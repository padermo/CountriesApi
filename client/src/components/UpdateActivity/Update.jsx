import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCoutries } from '../../redux/actions';
import axios from 'axios';
import Alert from '../Activities/Alert';

function Update({ match }) {
  // ! DATA COUNTRIES
  let dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getCoutries());
  },[dispatch])

  // ! STATE DIFFICULTY
  const [viewValue, setViewValue] = useState("0")

  // ! STATE VIEW ALERT
  const [viewAlert, setViewAlert] = useState(false)
  const [msg, setMsg] = useState('')

  // ! FORM
  // validar que no exista ningun campo vacio al enviar el formulario
  const [activity, setActivity] = useState({
    difficulty: "", 
    duration: "", 
    season: ""
  });

  // ! CAPTURE INPUTS
  const captureData = (e) => {
    setActivity({
      ...activity, [e.target.name]: e.target.value
    })
    if (e.target.name === 'difficulty') {
      setViewValue(e.target.value)
    }
  }
  
  
  // ! SEND DB
  const createActivity = async (e) => {
    const { difficulty, duration, season } = activity;
    e.preventDefault(); // prevenimos que se refresque el form
    if (difficulty=== "" || duration==="" || season==="") {
      setMsg('There are empty fields')
    } else {
      await axios.put(`http://localhost:3001/activity?name=${match.params.name}`, activity);
      setMsg('Activity Modify')
      setActivity({
        difficulty: "", 
        duration: "", 
        season: ""
      })
    }
  }


  return (
    <div className='container-update'>
      <div className="container-form-update">
        <h2>Modify Activity</h2>
        <form className='form-update' onSubmit={createActivity}>
          <label className='lbl-form-update' >Activity: {match.params.name}</label>

          <label className='lbl-form-update' htmlFor="difficulty">Difficulty: {viewValue}</label>
          <input className='inputs-range-update' id='difficulty' type="range" min="1" max="5" name='difficulty' value={activity.difficulty} onChange={captureData} placeholder="1 a 5"/>

          <label className='lbl-form-update' htmlFor="duration">Duration</label>
          <input className='inputs-escritura-update' id='duration' type="time" name='duration' value={activity.duration} onChange={captureData}/>

          {/* "Verano", "Otoño", "Invierno", "Primavera" */}
          <label className='lbl-form-update' htmlFor="season">Season</label>
          <select className='select-options-update' name="season" id="season" onChange={captureData}>
            <option value="#" selected disabled>Selected season</option>
            <option value="Verano">Verano</option>
            <option value="Otoño">Otoño</option>
            <option value="Invierno">Invierno</option>
            <option value="Primavera">Primavera</option>
          </select>
        
          <div className='container-btn-form'>
            <button className='btn-update-form btn-form' type='submit' >Update</button>
          </div>
        </form>

        <div className="container-alert" style={{visibility:`${viewAlert}`}}>
          <Alert msg={msg} />
        </div>
      </div>
    </div>
  )
}

export default Update