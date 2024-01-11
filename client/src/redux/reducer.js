import {
    SET_FILTER_COUNTRIES,
    GET_DATA_COUNTRIES,
    GET_ACTIVITIES,
    SET_CONTINENT
} from "./actions";

const initialState =  {
    countries: [],
    continents: [],
    activities: [],
    countriesFilter: []
}

const rootReducer = (state = initialState, {type, payload}) => {
    switch(type){  
        case SET_CONTINENT:
            return{...state, continents: payload} 
        case SET_FILTER_COUNTRIES:
            return{...state, countriesFilter: payload} 
        case GET_ACTIVITIES:
            return{...state, activities: payload} 
        case GET_DATA_COUNTRIES:
            return{...state, countries: payload} 
        default: 
            return{ ...state }
    }
}

export default rootReducer;