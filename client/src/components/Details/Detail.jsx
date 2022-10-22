import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDetails } from '../../redux/actions';
import ViewActivities from './ViewActivities';

function Detail({ match }) {
  let dispatch = useDispatch();
  let state = useSelector(state => state.detail);

  useEffect(() => {
    dispatch(getDetails(match.params.id))
  }, [dispatch, match.params.id]);


  // ! VIEW ACTIVITIES
  const [dataView, setDataView] = useState();
  const [nameBtn, setNameBtn] = useState("View Activities");

  const viewActivities = (e) => {
    if (e.target.value === "View Activities") {
      setNameBtn("Hidden Activities")
      setDataView((
        <ViewActivities activities={state.activities} />
      ))
    }

    if (e.target.value === "Hidden Activities") {
      setNameBtn("View Activities");
      setDataView([])
    }
  }


  return (
    <div className='container-detail'>
      <div className="container-interno-detail">
        <div className='container-interno-details'>
          <div className='container-img-detail'>
            <img className='img-detail-md' src={state.image} alt={`Bandera de ${state.name}`} />
          </div>
          <div className='container-info-detail'>
            <h1 className='name-country-detail'>{state.name} - {state.id}</h1>
            <ul className='list-detail'>
              <li>Continent: <span>{state.continent}</span></li>
              <li>Sub Region: <span>{state.subregion}</span></li>
              <li>Capital: <span>{state.capital}</span></li>
              <li>Population: <span>{state.population}</span></li>
              <li>Area: <span>{state.area}</span></li>
            </ul>
          </div>
          <div>
            <input className='btn-view-activities' type="button" value={nameBtn} onClick={viewActivities}/>
          </div>
        </div>

        <div className='container-activities-detail'>
          <div className='container-dataview'>
            <div className='container-interno-dataview'>
              {dataView}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail