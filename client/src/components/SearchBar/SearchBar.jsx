import styles from './SearchBar.module.css';
import { useState } from 'react';

export default function SearchBar({ onSearch }){
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        if (onSearch) onSearch(searchText);
    }

    const handleInputChange = (event) => setSearchText(event.target.value);
    
    return(
        <div className={styles.container}>
            <input className={styles.input} 
                   onChange={handleInputChange} 
                   value={searchText}
                   type="text" 
                   placeholder="Buscar..." />

            <button className={styles.button} onClick={handleSearch}>Buscar</button>
        </div>
    )
}