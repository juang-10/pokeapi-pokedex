import React from "react";
import { searchPokemon } from "../api";
const {useState} = React;

const Searchbar = () => {
    const [search, setSearch] = useState('');
    const onChange = (e) => {
        setSearch(e.target.value);
    }
    const onClick = async (e) => {
        const data = await searchPokemon(search);
        console.log(data);
    }
    
    return <div>
        <div>
            <input type="text" placeholder="Buscar Pokemon" onChange={onChange}
            />
        </div>
        <div>
            <button onClick={onClick}>Buscar</button>
        </div>
    </div>;
}

export default Searchbar;