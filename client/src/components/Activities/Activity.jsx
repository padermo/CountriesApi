import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCoutries } from "../../redux/actions";
import axios from 'axios'
import Alert from './Alert';

function Activity() {
  // ! DATA COUNTRIES
  let dispatch = useDispatch()
  let state = useSelector(state => state.countries);
  
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
    name: "",
    difficulty: "", 
    duration: "", 
    season: "",
    countryId: [],
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


  // ! CAPTURE COUNTRIES
  const captureCountries = (e) => {
    setActivity({
      ...activity,
      countryId: [...new Set([...activity.countryId, e.target.value])]
    })
  }

  // ! DELETE COUNTRIES ADD
  const deleteCountry = (e) => {
    e.preventDefault();
    setActivity({
      ...activity,
      countryId: activity.countryId.filter(f => f !== e.target.value)
    })
  }

  // ! SEND DB
  const createActivity = async (e) => {
    const { name, difficulty, duration, season, countryId } = activity;
    e.preventDefault(); // prevenimos que se refresque el form

    if (!name || !difficulty || !duration || !season || countryId.length === 0) {
      setViewAlert(true);
      setMsg('There are empty fields')
    } else {
      await axios.post("http://localhost:3001/activities", activity);
      setViewAlert(true);
      setMsg('Activity Created')
      setActivity({
        name: "",
        difficulty: "", 
        duration: "", 
        season: "",
        countryId: [],
      })
    }
  }

  return (
    <div className='container-activities'>
      <div className='container-form-activities'>
        <h2>Create Activity</h2>
        <form className='form-activities' onSubmit={createActivity}>
          <label className='lbl-form' htmlFor="name">Name</label>
          <input className='inputs-escritura' id='name' type="text" name='name' value={activity.name} onChange={captureData} placeholder='Name Activity...'/>

          <label className='lbl-form' htmlFor="difficulty">Difficulty: {viewValue}</label>
          <input className='inputs-range' id='difficulty' type="range" min="1" max="5" name='difficulty' value={activity.difficulty} onChange={captureData} placeholder="1 a 5"/>

          <label className='lbl-form' htmlFor="duration">Duration</label>
          <input className='inputs-escritura' id='duration' type="time" name='duration' value={activity.duration} onChange={captureData}/>

          {/* "Verano", "Otoño", "Invierno", "Primavera" */}
          <label className='lbl-form' htmlFor="season">Season</label>
          <select className='select-options' name="season" id="season" onChange={captureData}>
            <option value="#" selected disabled>Selected season</option>
            <option value="Verano">Verano</option>
            <option value="Otoño">Otoño</option>
            <option value="Invierno">Invierno</option>
            <option value="Primavera">Primavera</option>
          </select>

          <label className='lbl-form' htmlFor="countries">Countries</label>
          <select className='select-options' name="countryId" id="countries" onChange={captureCountries}>
            <option value="default" selected disabled>Selected countries</option>
            {
              state.sort((a, b) => {
                if (a.name < b.name) return -1
                if (a.name > b.name) return 1
                return 0
              }).map(e => (
                <option key={e.id} value={e.id}>{e.name}</option>
              ))
            }
          </select>
          
          {/* recuadro para ver los paises agregados */}
          <div className='container-countries-add'>
            <div className="container-interno-add">
              {
                activity.countryId.map(e => (
                  <div key={e} className='border-btn-country'>
                    <label className='lbl-country-add'>{e}</label>
                    <button className='btn-delete-country' onClick={deleteCountry} value={e}>X</button>
                  </div>
                ))
              }
              </div>
          </div>

          <div className='container-btn-form'>
            <button className="btn-delete-all btn-form">Delete All</button>
            <button className='btn-create-form btn-form' type='submit' >Crear</button>
          </div>
        </form>
        <div className="container-alert" style={{visibility:`${viewAlert}`}}>
          <Alert msg={msg} />
        </div>
      </div>    
    </div>
  )
}

export default Activity