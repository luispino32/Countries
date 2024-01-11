import style from './DetailPage.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function DetailPage(){
    const [country, setCountry] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3001/countries/${id}`)
        .then(response => response.json())
        .then(data => {
            if(data.name){
                setCountry(data);
            }else{
                window.alert('No existe ciudad para este Id');
            }
        }).catch(error => {
            console.log('error', error.message);
        })
    }, [id]);
    
    return (
        <div className={style.container}>
            <h2 className={style.title}>{country.name}</h2>
            <img src={country.image} alt={`${country.name} Flag`} className={style.flagImage} />

            <div>
                <span className={style.label}>Continente:</span>
                <span>{country.continent}</span>
            </div>

            <div>
                <span className={style.label}>Capital:</span>
                <span>{country.capital}</span>
            </div>

            <div>
                <span className={style.label}>Subregion:</span>
                <span>{country.subregion}</span>
            </div>

            <div>
                <span className={style.label}>Area:</span>
                <span>{country.area}</span>
            </div>

            <div>
                <span className={style.label}>Poblacion:</span>
                <span>{country.poblacion}</span>
            </div>

            <div className={style.activityContainer}>
              <span className={style.label}>Actividades:</span>
                {country.Activities?.map((activity, index) => (
                    <div key={index} className={style.activityBox}>
                        <div><strong>Nombre:</strong> {activity.name}</div>
                        <div><strong>Dificultad:</strong> {activity.difficulty}</div>
                        <div><strong>Duracion:</strong> {activity.duration}</div>
                        <div><strong>Temporada:</strong> {activity.season}</div>
                    </div>
                ))}
            </div>
        </div>
      );
}