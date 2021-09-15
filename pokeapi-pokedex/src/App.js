import React from "react";
import './App.css';
import Navbar from './components/Navbar';
import Pokedex from './components/Pokedex';
import Searchbar from './components/Searchbar';
import { getPokemonData, getPokemons } from "./api";

const {useState, useEffect} = React;

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState();
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(true);
  
  const fetchPokemons = async () => {
    try {
      const data = await getPokemons();
      const promises = data.results.map( async (pokemon) => {
        return await getPokemonData(pokemon.url)
      })
      const results = await Promise.all(promises)
      setPokemons(results)
      setLoading(false )
    } catch (err) {}
  }

  useEffect(() => {
    fetchPokemons();
  }, [])
  return (
    <div>
      <Navbar/>
      <div className="App">
        <Searchbar/>
        { loading ? (
          <div>Cargando Pokemones</div>
        ) : (
        <Pokedex pokemons={pokemons}/>
        )}
      </div>
    </div>
  );
}
