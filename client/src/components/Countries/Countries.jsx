import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCoutries } from '../../redux/actions';
import Country from './Country';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCaretRight, faCaretLeft} from '@fortawesome/free-solid-svg-icons'


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

  const [dataContinent, setDataContinent] = useState([])
  const [dataView, setDataView] = useState([])
  const [totalPage, setTotalPage] = useState(25);

  const selectContinent = (e) => {
    switch (e.target.value) {
      case 'asia':
        let asia = state.filter(e => e.continent === "Asia")
        let total1 = asia.length;
        let page1 = Math.round(Number(total1) / 10) + 1
        setTotalPage(page1)
        setDataContinent(asia)
        return;
      case 'oceania':
        let oceania = state.filter(e => e.continent === "Oceania")
        let total2 = oceania.length;
        let page2 = Math.round(Number(total2) / 10)
        setTotalPage(page2)
        setDataContinent(oceania);
        return;
      case 'europe':
        let europe = state.filter(e => e.continent === "Europe")
        let total3 = europe.length;
        let page3 = Math.round(Number(total3) / 10) + 1
        setTotalPage(page3)
        setDataContinent(europe);
        return;
      case 'northAmerica':
        let northAmerica = state.filter(e => e.continent === "North America")
        let total4 = northAmerica.length;
        let page4 = Math.round(Number(total4) / 10) + 1
        setTotalPage(page4)
        setDataContinent(northAmerica);
        return;
      case 'africa':
        let africa = state.filter(e => e.continent === "Africa")
        let total5 = africa.length;
        let page5 = Math.round(Number(total5) / 10)
        setTotalPage(page5)
        setDataContinent(africa);
        return;
      case 'southAmerica':
        let southAmerica = state.filter(e => e.continent === "South America")
        let total6 = southAmerica.length;
        let page6 = Math.round(Number(total6) / 10) + 1
        setTotalPage(page6)
        setDataContinent(southAmerica);
        return;
      case 'antarctica':
        let antarctica = state.filter(e => e.continent === "Antarctica")
        let total7 = antarctica.length;
        let page7 = Math.round(Number(total7) / 10)
        setTotalPage(page7)
        setDataContinent(antarctica);
        return;
      default:
        break;
    }
  }
  

  // ! PAGINADO
  let itemsPage = 10;

  const [datos, setDatos] = useState([]);
  const [current, setCurrent] = useState(0);

  // cuando se llame al state
  useEffect(() => {
    if (state.length === 1) {
      setDatos([...state])
    } else {
      setDatos([...state].splice(0, 10))
    }
  }, [state, cambioAsc, cambioDesc, cambioMayor, cambioMenor])

  useEffect(() => {
    setDataView([...dataContinent].splice(0, 10))
  },[dataContinent])

  // btn next page
  const next = () => {
    if (dataContinent.length) {
      const total = dataContinent.length; // 14
      const nextPage = current + 1; // aumentamos en 1 el current
      const index = nextPage * itemsPage; // sacamos el indice de los elementos mostrados
      // cuando el indice sea igual a la cantidad de elementos que tiene el state general retorna
      if (index >= total) return;
      setDataView([...dataContinent].splice(index, itemsPage))
      setCurrent(nextPage) // actualizamos el state current
    }

    if (datos.length) {
      const totalElementos = state.length; // tomamos la cantidad de elementos del state general
      const nextPage = current + 1; // aumentamos en 1 el current
      const index = nextPage * itemsPage; // sacamos el indice de los elementos mostrados
      if (index === totalElementos)return
      setDatos([...state].splice(index, itemsPage)); // mostramos los proximos 10 elementos
      setCurrent(nextPage) // actualizamos el state current
    }
  }

  // btn prev page
  const prev = () => {
    const prevPage = current - 1; // disminuimos en 1 el current
    if (prevPage < 0) return; // cuando la pagina sea menor de 0, ya no hay elementos que mostrar
    const index = prevPage * itemsPage; // sacamos el indice de los elementos mostrados
    setDatos([...state].splice(index, itemsPage)); // mostramos los anteriores 10 elementos
    setDataView([...dataContinent].splice(index, itemsPage))
    setCurrent(prevPage) // actualizamos el state current
  }



  // ! FILTER ACTIVITIES
  // obtenemos todas las actividades
  const [datosActivities, setDatosActivities] = useState([])
  // obtenemos la actividad con todos los paises que la contienen
  const [countriesActivity, setCountriesActivity] = useState([])
  // guardamos una copia de la info del pais
  const [copyCountryActivity, setCopyCountryActivity] = useState()

  // hacemos el llamado a la DB y cargamos el state con todas las actividades creadas
  useEffect(() => {
    const loadingData = async () => {
      setDatosActivities(await axios.get("http://localhost:3001/activities"));
    }
    loadingData()
  }, [])

  // cuando se efectue un cambio en el state datosActivities se va a llenar el state countriesActivity con el arreglo de los paises
  useEffect(() => {
    setCountriesActivity(datosActivities.data?.map(e => e.countries))
  },[datosActivities])


  // * hacer logica para filtrar los paises segun la actividad seleccionada -ok
  // * arreglar el mapeo de los datos guardados en el state para que muestre todos y no solo uno
  const selectActivity = (e) => {
    if (countriesActivity.length) {
      for (let i = 0; i <= datosActivities.data.length; i++){
        if (datosActivities.data[i]?.name === e.target.value) {
          setCopyCountryActivity(countriesActivity[i])
        }
      }
    }
  }
  // console.log(copyCountryActivity)

  return (
    <div className='container-countries'>
      <div className='container-interno-countries'>
        <div className='container-options-countries'>
          
          <div className='container-paginado'>
            <button className='btn-paginado' onClick={prev}><FontAwesomeIcon icon={faCaretLeft} className='icon-fontawesome-countries'/></button>
            <label className='counter-page'>{current + 1} de {totalPage}</label>
            <button className='btn-paginado' onClick={next}><FontAwesomeIcon icon={faCaretRight} className='icon-fontawesome-countries'/></button>
          </div>

          <div className='container-filter'>

            <select className='select-filtros sort-filter' onChange={selectOption}>
              <option value="default" selected disabled>Sort Filter</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
              <option value="mayorMenor">Mayor a Menor Poblacion</option>
              <option value="menorMayor">Menor a Mayor Poblacion</option>
            </select>

            <select className='select-filtros' onChange={selectContinent}>
              <option value="default" selected disabled>Continent Filter</option>
              <option value="asia">Asia</option>
              <option value="oceania">Oceania</option>
              <option value="europe">Europe</option>
              <option value="northAmerica">North America</option>
              <option value="africa">Africa</option>
              <option value="southAmerica">South America</option>
              <option value="antarctica">Antarctica</option>
            </select>

            <select className='select-filtros activity-filter' onChange={selectActivity}>
              <option value="default" selected disabled>Activity Filter</option>
              {
                datosActivities.data?.map(e => (
                  <option value={e.name} key={e.id}>{e.name}</option>
                ))
              }
            </select>

          </div>

        </div> {/* fin div options */}
        <div className='container-coutries-all'>
          {
            state2.length ?
              state2.map(e => (
                <div key={e.id} className='container-country-map'>
                  <Link to={`/countries/${e.id}`} className='link'>
                    <Country name={e.name} image={e.image} continent={e.continent} />
                  </Link>
                </div>
              ))
              :
              copyCountryActivity ?
                copyCountryActivity.map(e => (
                  <div key={e.id} className='container-country-map'>
                    <Link to={`/countries/${e.id}`} className='link'>
                      <Country name={e.name} image={e.image} continent={e.continent} />
                    </Link>
                  </div>
                ))
                :
                dataView.length ?
                  dataView.map(e => (
                  <div key={e.id} className='container-country-map'>    
                    <Link to={`/countries/${e.id}`} className='link'>
                      <Country name={e.name} image={e.image} continent={e.continent} />
                    </Link>
                  </div>
                ))
                :
                datos.length ?
                    datos.map(e => (
                    <div key={e.id} className='container-country-map'>    
                      <Link to={`/countries/${e.id}`} className='link'>
                        <Country name={e.name} image={e.image} continent={e.continent} />
                      </Link>
                    </div>
                  ))
                  :
                  <div className='contenedor-nodata-countries'>
                    <h1>No se encontraron datos</h1>
                  </div>
          }
        </div>{/* fin div map */}
      </div>
    </div>
  )
}

export default Countries