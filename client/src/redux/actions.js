import axios from 'axios';

export const SET_FILTER_COUNTRIES = "SET_FILTER_COUNTRIES";
export const GET_DATA_COUNTRIES = "GET_DATA_COUNTRIES";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const SET_CONTINENT = "SET_CONTINENT";

export const setFilter = (countries, continent, activity, order) => {
    let dataFilter = [...countries];

    if(continent === '' && activity === '' && order === ''){
        dataFilter = [];
    }else{
        if(continent !== '') dataFilter = dataFilter.filter(country => country.continent === continent);
        if(activity !== '') dataFilter = dataFilter.filter(country => country.Activities.some(data => data.name === activity));
        if(dataFilter.length === 0) dataFilter = ['Sin coincidencias . . .'];
        if(order !== ''){
            const data = dataFilter.slice().sort((a, b) => a.name.localeCompare(b.name));
            dataFilter = order === 'ascendente' ? data : data.reverse();
        }
    }

    return{
        type: SET_FILTER_COUNTRIES,
        payload: dataFilter
    }
}

export const setSearchCountry = (country) => {
    return{
        type: SET_FILTER_COUNTRIES,
        payload: Array.isArray(country) ? country : [country]
    }
}

export const clearFilters = () => {
    return{
        type: SET_FILTER_COUNTRIES,
        payload: []
    }
}

export const setContinent = (continents) => {
    const data = [...new Set(continents)];

    return{
        type: SET_CONTINENT,
        payload: data.slice().sort()
    }
}

export const getCountries = () => {
    return async (dispach) => {
        try{
            const {data} = await axios.get(`http://localhost:3001/countries`);
            
            return dispach({
                type: GET_DATA_COUNTRIES,
                payload: data
            });
        }catch(error){
            window.alert(error.message);
        }
    };
};

export const getActivities = () => {
    return async (dispach) => {
        try{
            const {data} = await axios.get(`http://localhost:3001/activities`);
            
            return dispach({
                type: GET_ACTIVITIES,
                payload: data
            });
        }catch(error){
            window.alert(error.message);
        }
    };
};
