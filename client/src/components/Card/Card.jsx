import styles from './Card.module.css';
import { Link } from 'react-router-dom';

export default function Card ({ id, name, continent, imageUrl }){

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={name} className={styles.image} />
      </div>
      <div className={styles.textContainer}>
          <Link to={`/Detail/${id}`}>
            <p className={styles.countryName}>{name}</p>
          </Link>
          <p className={styles.continent}>{continent}</p>
      </div>
    </div>
  );
};
