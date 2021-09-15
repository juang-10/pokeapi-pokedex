import React from "react";
import { searchPokemon } from "../api";
const {useState} = React;

const Searchbar = (props) => {
    const {onSearch} = props;
    const [search, setSearch] = useState('');

    const onChange = (e) => {
        setSearch(e.target.value);
        if(e.target.value.length === 0) {
            onSearch(null);
        }
    }
    const onClick = async (e) => {
        onSearch(search); // Llama la función de la linea 65 del comoponente padre (app.js)
    }
    
    return (
    <div className="searchbar-container">
        <div className="searchbar">
            <input type="text" placeholder="Buscar Pokemon" onChange={onChange} />
        </div>
        <div className="searchbar-btn">
            <button onClick={onClick}>Buscar</button>
        </div>
    </div>
    );
}

export default Searchbar;