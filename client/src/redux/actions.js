import axios from 'axios';

export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_DETAILS = 'GET_DETAILS';
export const GET_COUNTRY_NAME = 'GET_COUNTRY_NAME';


export const getCoutries = () => {
  return async (dispatch) => {
    let pedidoApi = await axios.get("http://localhost:3001/countries");
    dispatch({ type: GET_COUNTRIES, payload: pedidoApi.data });
  }
}

export const getDetails = (id) => {
  return async (dispatch) => {
    let pedidoApi = await axios.get(`http://localhost:3001/countries/${id}`);
    dispatch({ type: GET_DETAILS, payload: pedidoApi.data });
  }
}

export const getCountryName = (name) => {
  return async (dispatch) => {
    let pedidoApi = await axios.get(`http://localhost:3001/countries?name=${name}`);
    dispatch({ type: GET_COUNTRY_NAME, payload: pedidoApi.data });
  }
}