import React, { useContext } from "react";
import './App.css';
import Navbar from './components/Navbar';
import Pokedex from './components/Pokedex';
import Searchbar from './components/Searchbar';
import { getPokemonData, getPokemons } from "./api";
import { FavoriteProvider } from "./contexts/favoritesContext";

const {useState, useEffect} = React;
const localStorageKey = "favorite_pokemon";

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(["bulbasaur"]);
  
  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons(99, 99 * page); // Cuantos quiero mostrar por página
      const promises = data.results.map( async (pokemon) => {
        return await getPokemonData(pokemon.url)
      })
      const results = await Promise.all(promises)
      setPokemons(results)
      setLoading(false)
      setTotal(Math.ceil(data.count / 99)) // Cantidad de registro totales
    } catch (err) {}
  }

  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
    setFavorites(pokemons);
  }

  useEffect(() => {
    console.log('Obteniendo pokemones favoritos');
    loadFavoritePokemons();
  },[])

  useEffect(() => {
    console.log('Obteniendo todos los pokemones');
    fetchPokemons();
  }, [page]);

  // Cargar nuestor pokemon favorito
  const updateFavoritePokemons = (name) => {
    const updated = [...favorites]
    const isFavorite = updated.indexOf(name);
    if(isFavorite >= 0) {
      updated.splice(isFavorite, 1);
    } else {
      updated.push(name);
    }

    setFavorites(updated)

    // Mantener guardado en el local storage nuestros pokemons fav
    window.localStorage.setItem(localStorageKey, JSON.stringify(updated));
  }
  return (
    <FavoriteProvider 
      value={{
        favoritePokemons: favorites, 
        updateFavoritePokemons: updateFavoritePokemons
      }}>
    <div>
      <Navbar/>
      <div className="App">
        <Searchbar/>
        <Pokedex
          loading={loading} 
          pokemons={pokemons}
          page = {page}
          setPage = {setPage}
          total = {total}
        />
      </div>
    </div>
    </FavoriteProvider>
  );
}
