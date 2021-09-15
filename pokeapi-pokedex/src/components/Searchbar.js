import React from "react";
import { searchPokemon } from "../api";
const {useState} = React;

const Searchbar = () => {
    const [search, setSearch] = useState('');
    const[pokemon, setPokemon] = useState('');

    const onChange = (e) => {
        setSearch(e.target.value);
    }
    const onClick = async (e) => {
        const data = await searchPokemon(search);
        setPokemon(data);
    }
    
    return <div>
        <div>
            <input type="text" placeholder="Buscar Pokemon" onChange={onChange}
            />
        </div>
        <div>
            <button onClick={onClick}>Buscar</button>
        </div>
        <div>
            {pokemon &&
            <div>
                <div>Nombre: {pokemon.name}</div>
                <div>Peso: {pokemon.weight}</div>
                <img src={pokemon.sprites.front_default}/>
            </div>
            }
        </div>
    </div>;
}

export default Searchbar;