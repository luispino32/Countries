import Card from '../Card/Card';
import styles from './Cards.module.css';

export default function Cards({ data }){

    return (
      <div className={styles.cardsContainer}>
          {data?.map((countryData, index) => (
                countryData.hasOwnProperty('name') ?
                <Card key={index} countryData={countryData}
                        id={countryData.id}
                        name={countryData.name}
                        imageUrl={countryData.image}
                        continent={countryData.continent} /> : countryData
          ))}
      </div>
    )
}
