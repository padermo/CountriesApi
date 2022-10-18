import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCoutries } from "../../redux/actions";
import axios from 'axios'

function Activity() {
  // ! DATA COUNTRIES
  let dispatch = useDispatch()
  let state = useSelector(state => state.countries);
  
  useEffect(() => {
    dispatch(getCoutries());
  },[dispatch])

  // ! STATE BTN CREATE

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
      alert("Hay campos vacios");
    } else {
      await axios.post("http://localhost:3001/activities", activity);
      alert("Create activity")
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
    <div>
      <div>
        <form onSubmit={createActivity} style={{display:"grid", justifyContent:"center"}}>
          <label htmlFor="name">Name</label>
          <input id='name' type="text" name='name' value={activity.name} onChange={captureData} />

          <label htmlFor="difficulty">Difficulty</label>
          <input id='difficulty' type="range" min="1" max="5" name='difficulty' value={activity.difficulty} onChange={captureData} placeholder="1 a 5"/>

          <label htmlFor="duration">Duration</label>
          <input id='duration' type="time" name='duration' value={activity.duration} onChange={captureData}/>

          {/* "Verano", "Otoño", "Invierno", "Primavera" */}
          <label htmlFor="season">Season</label>
          <select name="season" id="season" onChange={captureData}>
            <option value="#" selected disabled>Selected season</option>
            <option value="Verano">Verano</option>
            <option value="Otoño">Otoño</option>
            <option value="Invierno">Invierno</option>
            <option value="Primavera">Primavera</option>
          </select>

          <label htmlFor="countries">Countries</label>
          <select name="countryId" id="countries" onChange={captureCountries}>
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
          <div>
            {
              activity.countryId.map(e => (
                <div key={e}>
                  <label>{e}</label>
                  <button onClick={deleteCountry} value={e}>X</button>
                </div>
              ))
            }
          </div>

          
          <button type='submit' >Crear</button>
        </form>
      </div>    
    </div>
  )
}

export default Activity