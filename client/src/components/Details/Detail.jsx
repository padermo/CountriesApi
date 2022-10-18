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
    <div>
      <div>
        <div>
          <img src={state.image} alt={`Bandera de ${state.name}`} />
        </div>
        <h1>{state.name} - {state.id}</h1>
        <ul>
          <li>Continent: <span>{state.continent}</span></li>
          <li>Sub Region: <span>{state.subregion}</span></li>
          <li>Capital: <span>{state.capital}</span></li>
          <li>Population: <span>{state.population}</span></li>
          <li>Area: <span>{state.area}</span></li>
        </ul>
        <input type="button" value={nameBtn} onClick={viewActivities}/>
        {dataView}
      </div>
    </div>
  )
}

export default Detail