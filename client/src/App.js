import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Routes, Route, useLocation } from "react-router-dom";

import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import SearchBar from "./components/SearchBar/SearchBar";
import FilterBar from './components/FilterBar/FilterBar';
import DetailPage from './components/DetailPage/DetailPage';
import FormActivity from './components/FormActivity/FormActivity';

import { getCountries, 
         getActivities, 
         setContinent, 
         setFilter,
         setSearchCountry } from "./redux/actions";

function App() {
  const [orden, setOrden] = useState('');
  const [paginacion, setPaginacion] = useState(1);
  const [filtroActividad, setFiltroActividad] = useState('');
  const [filtroContinente, setFiltroContinente] = useState('');

  const location = useLocation();

  const dispatch = useDispatch();
  const dataCountries = useSelector((state) => state.countries);
  const countriesFilter = useSelector((state) => state.countriesFilter);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, []);

  useEffect(() => {
    if(dataCountries.length > 0)
      dispatch(setContinent(dataCountries.map(country => country.continent)));
  }, [dataCountries]);

  useEffect(() => {
    console.log(filtroContinente + ', ' + filtroActividad + ', ' + orden);

    dispatch(setFilter(dataCountries, filtroContinente, filtroActividad, orden));
  }, [orden, filtroActividad, filtroContinente]);

  const onSearch = async (searchText) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/countries?name=${searchText}`);

      if(data){
        setPaginacion(1);
        if(data.length == 0) dispatch(setSearchCountry(['Sin coincidencias . . .']))
        else dispatch(setSearchCountry(data));
      }
      
      
    } catch (error) {
      console.log('Error al obtener datos de la base de datos:', error.message);
    }
  }

  const dataCountries2 = countriesFilter.length > 0 ? countriesFilter : dataCountries;

  return (
    <div className="App">
      {(location.pathname !== '/') && <NavBar/>}
      {(location.pathname.includes('/Home')) && <SearchBar onSearch={onSearch} />}
      {(location.pathname.includes('/Home')) && <FilterBar continent={{filtroContinente, setFiltroContinente}}
                                                           activity={{filtroActividad, setFiltroActividad}}
                                                           resetPaginacion={() => setPaginacion(1)}
                                                           order={{orden, setOrden}} />}

      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/Home" element={<Home paginacion={paginacion}
                                           setPaginacion={setPaginacion}
                                           paginas={Math.ceil(dataCountries2.length/10)}
                                           dataCards={dataCountries2?.slice(paginacion*10 - 10, paginacion*10)}
                                           />}/> 

        <Route path="/Detail/:id" element={<DetailPage/>} />
        <Route path="/Activity" element={<FormActivity/>} />
      </Routes>
    </div>
  );
}

export default App;
