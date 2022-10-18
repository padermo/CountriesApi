import { GET_COUNTRIES, GET_DETAILS, GET_COUNTRY } from './actions';

let initialState = {
  countries: [],
  country: [],
  detail: {},
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload
      }
    case GET_DETAILS:
      return {
        ...state,
        detail: action.payload
      }
    case GET_COUNTRY:
      return {
        ...state,
        country: [action.payload]
      }
    default:
      return state;
  }
}