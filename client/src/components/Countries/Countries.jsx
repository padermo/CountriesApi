import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCoutries } from '../../redux/actions';
import Country from './Country';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Countries() {
  // ! LLAMADO A LA DB
  let dispatch = useDispatch();
  let state = useSelector(state => state.countries);
  let state2 = useSelector(state => state.country);

  useEffect(() => {
    dispatch(getCoutries());
  }, [dispatch]);
  
  // ! ACTUALIZADOS DE INFORMACION VISUAL
  const [cambioAsc, setCambioAsc] = useState(false);
  const [cambioDesc, setCambioDesc] = useState(false);
  const [cambioMayor, setCambioMayor] = useState(false);
  const [cambioMenor, setCambioMenor] = useState(false);


  // ! ORDENAMIENTOS
  const selectOption = (e) => {
    switch (e.target.value) {
      case 'asc':
        state.sort((a, b) => {
          setCambioAsc(true)
          setCambioDesc(false)
          setCambioMayor(false)
          setCambioMenor(false)
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        })
        break;
      case 'desc':
        state.sort((a, b) => {
          setCambioAsc(false)
          setCambioDesc(true)
          setCambioMayor(false)
          setCambioMenor(false)
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
          return 0
        })
        break;
      case 'mayorMenor':
        state.sort((a, b) => {
          setCambioAsc(false)
          setCambioDesc(false)
          setCambioMayor(true)
          setCambioMenor(false)
          return Number(b.population) - Number(a.population);
        });
        break;
      case 'menorMayor':
        state.sort((a, b) => {
          setCambioAsc(false)
          setCambioDesc(false)
          setCambioMayor(false)
          setCambioMenor(true)
          return Number(a.population) - Number(b.population);
        });
        break;
      default:
        break;
    }
  }

  // ! FILTROS
  // ? NOTA: filtro por continente no funciona el paginado, --- REVISAR ---
  // continent
  // Asia - Oceania - Europe - North America - Africa - South America - Antarctica
  const selectContinent = (e) => {
    switch (e.target.value) {
      case 'asia':
        setDatos([...state].filter(e => e.continent === "Asia"));
        break;
      case 'oceania':
        setDatos([...state].filter(e => e.continent === "Oceania"));
        break;
      case 'europe':
        setDatos([...state].filter(e => e.continent === "Europe"));
        break;
      case 'northAmerica':
        setDatos([...state].filter(e => e.continent === "North America"));
        break;
      case 'africa':
        setDatos([...state].filter(e => e.continent === "Africa"));
        break;
      case 'southAmerica':
        setDatos([...state].filter(e => e.continent === "South America"));
        break;
      case 'antarctica':
        setDatos([...state].filter(e => e.continent === "Antarctica"));
        break;
      default:
        break;
    }
  }

  

  // ! PAGINADO
  const itemsPage = 10;

  const [datos, setDatos] = useState([]);
  const [current, setCurrent] = useState(0);

  // cuando se llame al state
  useEffect(() => {
    state.length === 1 ?
      setDatos([...state])
      :
      setDatos([...state].splice(0, itemsPage))
  }, [state, cambioAsc, cambioDesc, cambioMayor, cambioMenor])

  // btn next page
  const next = () => {
    const totalElementos = state.length; // tomamos la cantidad de elementos del state general
    const nextPage = current + 1; // aumentamos en 1 el current
    const index = nextPage * itemsPage; // sacamos el indice de los elementos mostrados

    // cuando el indice sea igual a la cantidad de elementos que tiene el state general retorna
    if (index === totalElementos) return;
    setDatos([...state].splice(index, itemsPage)); // mostramos los proximos 10 elementos
    setCurrent(nextPage) // actualizamos el state current
  }

  // btn prev page
  const prev = () => {
    const prevPage = current - 1; // disminuimos en 1 el current
    if (prevPage < 0) return; // cuando la pagina sea menor de 0, ya no hay elementos que mostrar
    const index = prevPage * itemsPage; // sacamos el indice de los elementos mostrados
    setDatos([...state].splice(index, itemsPage)); // mostramos los anteriores 10 elementos
    setCurrent(prevPage) // actualizamos el state current
  }

  // ! FILTER ACTIVITIES
  // obtenemos todas las actividades
  const [datosActivities, setDatosActivities] = useState([])

  useEffect(async () => {
    setDatosActivities(await axios.get("http://localhost:3001/activities"));
  }, [])

  // * hacer logica para filtrar los paises segun la actividad seleccionada
  const selectActivity = (e) => {
    
  }

  return (
    <div>
      <div>
        <h2>Page: {current}</h2>
        <button onClick={prev}>prev</button>
        <button onClick={next}>next</button>

        <select onChange={selectOption}>
          <option value="default" selected disabled>Elija el ordenamiento</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          <option value="mayorMenor">Mayor a Menor Poblacion</option>
          <option value="menorMayor">Menor a Mayor Poblacion</option>
        </select>

        <select onChange={selectContinent}>
          <option value="default" selected disabled>Elija continente</option>
          <option value="asia">Asia</option>
          <option value="oceania">Oceania</option>
          <option value="europe">Europe</option>
          <option value="northAmerica">North America</option>
          <option value="africa">Africa</option>
          <option value="southAmerica">South America</option>
          <option value="antarctica">Antarctica</option>
        </select>

        <select onChange={selectActivity}>
          <option value="default" selected disabled>Elija actividad</option>
          {
            datosActivities.data?.map(e => (
              <option value={e.name} key={e.id}>{e.name}</option>
            ))
          }
        </select>
      </div>
      {
        state2.length ?
          state2.map(e => (
            <Link key={e.id} to={`/countries/${e.id}`}>
              <Country name={e.name} image={e.image} continent={e.continent} />
            </Link>
          ))
          :
          datos.length ?
            datos.map(e => (
              <Link key={e.id} to={`/countries/${e.id}`}>
                <Country name={e.name} image={e.image} continent={e.continent} />
              </Link>
            ))
            :
            <div>
              <h1>No se encontraron datos</h1>
            </div>
      }
    </div>
  )
}

export default Countries