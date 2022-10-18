import axios from 'axios';

export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_DETAILS = 'GET_DETAILS';
export const GET_COUNTRY = 'GET_COUNTRY';


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

export const getCountry = (name) => {
  return async (dispatch) => {
    let pedidoApi = await axios.get(`http://localhost:3001/countries?name=${name}`);
    dispatch({ type: GET_COUNTRY, payload: pedidoApi.data });
  }
}