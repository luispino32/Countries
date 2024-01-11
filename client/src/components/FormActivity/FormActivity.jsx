import { getCountries, getActivities} from "../../redux/actions";
import { useDispatch, useSelector } from 'react-redux';
import style from './FormActivity.module.css';
import { useEffect, useState } from 'react';
import validation from './validation';

const temporadas = ["Verano", "Otoño", "Invierno", "Primavera"];

export default function FormActivity(){
    const [errors, setErrors] = useState({countries: 'Debe tener al menos un pais asignado'});
    const [countries, setCountries] = useState([]);
    const [form, setForm] = useState({
        name: "new activity",
        dificult: 1,
        duration: 1,
        season: temporadas[0],
        countries: '',
        countrieSave: []
    });

    const dispatch = useDispatch();
    const dataCountries = useSelector((state) => state.countries);

    useEffect(() => {
        if(dataCountries.length > 0){
            const data = (dataCountries.map(country => country.name)).sort();
            setCountries(data);
            setForm({...form, countries:data[0]});
        }  
    }, [dataCountries]);

    const handlerChange = (e) => {
        const property = e.target.name;
        const value = e.target.value;

        setForm({...form, [property]: value});
        validation({...form, [property]: value}, errors, setErrors);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        const countriesId = form.countrieSave.map(country =>{
            const dataCountry = dataCountries.find(data => data.name === country);
            return dataCountry.id;
        });
        
        fetch(`http://localhost:3001/activities`, 
        { method: "POST", 
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({name: form.name,
                                difficulty: form.dificult,
                                duration: form.duration,
                                season: form.season,
                                countriesId: countriesId}) 
        })
        .then(response => response.json())
        .then(data => {
            if(data.name){
                window.alert('Actividad creada exitosamente');
                const data = (dataCountries.map(country => country.name)).sort();
                setCountries(data);
                setForm({name:"new activity", dificult:1, duration:1, season:temporadas[0], countries:data[0],countrieSave:[]});

                dispatch(getCountries());
                dispatch(getActivities());
            }else{
                window.alert('No se pudo guardar la informacion');
            }
        }).catch(error => {
            console.log('error', error.message);
        })
    }

    const handlerRemoveCountry = (data) => {
        const newCountries = [...countries, data];
        setCountries(newCountries.sort());
        setForm({...form, countrieSave: form.countrieSave.filter(country => country !== data)});
        validation({...form, countrieSave: form.countrieSave.filter(country => country !== data)}, errors, setErrors);
    }

    const handlerAddCountry = () => {
        const contryAdd = form.countries;
        setCountries(countries.filter(country => country !== contryAdd));
        setForm({
            ...form, 
            countries: countries[0] === contryAdd ? countries[1] : countries[0], 
            countrieSave: [...form.countrieSave, contryAdd]});
        validation({...form, countrieSave: [...form.countrieSave, contryAdd]}, errors, setErrors);
    }

    return(
        <div className={style.divGeneral}>
            <form className={style.formStyle} onSubmit={submitHandler}>
                <div>
                    <label className={style.labelForm} htmlFor='name'>Nombre:</label>
                    <input type='text' name='name' value={form.name} onChange={handlerChange}/>
                    <span> {errors.name}</span>
                </div>

                <div>
                    <label className={style.labelForm} htmlFor='dificult'>Dificultad:</label>
                    <input type='number' name='dificult' value={form.dificult} onChange={handlerChange}/>
                    <span> {errors.dificult}</span>
                </div>

                <div>
                    <label className={style.labelForm} htmlFor='duration'>Duración:</label>
                    <input type='number' name='duration' value={form.duration} onChange={handlerChange}/>
                    <span> {errors.duration}</span>
                </div>

                <div>
                    <label className={style.labelForm} htmlFor='season'>Temporada:</label>
                    <select name="season" value={form.season} onChange={handlerChange}>
                        {temporadas.map((temporada, index) =>
                            (<option key={`Temp_${index}`}>{temporada}</option>))}
                    </select>
                </div>
                
                <div className={style.divCountry}>
                    <div>
                        <label className={style.labelForm} htmlFor='countries'>Paises:</label>
                        <select name="countries" value={form.countries} onChange={handlerChange}>
                            {countries?.map((contry, index) =>
                                (<option key={`Country_${index}`}>{contry}</option>))}
                        </select>
                    </div>
                    <div>
                        <input type="button" value='Agregar' onClick={handlerAddCountry}/>
                    </div>
                </div>

                <div className={style.divCountryAdd}>
                    {form.countrieSave.map((country, index) => {
                        return(
                            <div key={`countryS_${index}`}>
                                <span>{country}</span>
                                <input className={style.buttonDelete} 
                                    type="button" 
                                    value='X' 
                                    onClick={() => handlerRemoveCountry(country)}/>
                            </div>)
                    })}
                    {form.countrieSave.length === 0 && <span>{errors.countries}</span>}
                </div>

                <button  type='submit'
                         className={style.buttonCreate} 
                         disabled={errors.name || 
                                   errors.dificult || 
                                   errors.duration || 
                                   errors.countries ? true : false}>Crear</button>
            </form>
        </div>
    )
}