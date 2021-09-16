import React, { useContext } from "react";
import '../App.css';
import Navbar from '../components/Navbar';
import Pokedex from '../components/Pokedex';
import Searchbar from '../components/Searchbar';
import { getPokemonData, getPokemons, searchPokemon } from "../api";
import { FavoriteProvider } from "../contexts/favoritesContext";

const {useState, useEffect} = React;
const localStorageKey = "favorite_pokemon";

export default function MainComponent() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(["bulbasaur"]);
  const [notFound, setNotFound ] = useState(false); // No encontrar un pokemon
  const [ searching, setSearching] = useState(false);
  
  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons(99, 99 * page); // Cuantos quiero mostrar por página
      const promises = data.results.map( async (pokemon) => {
        return await getPokemonData(pokemon.url)
      })
      const results = await Promise.all(promises)
      setPokemons(results);
      setLoading(false);
      setTotal(Math.ceil(data.count / 99)) // Cantidad de registro totales
      setNotFound(false);;
    } catch (err) {}
  }

  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
    setFavorites(pokemons);
  }

  useEffect(() => {
    loadFavoritePokemons();
  }, [])

  useEffect(() => {
    if(!searching) {
      fetchPokemons();
    }
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

  // Búsqueda del pokemon dentro de la pokedex
  const onSearch = async (pokemon) => {
    // Si no hay resultado de búsqueda, mostrarnos todos los pokemons (if)
    if(!pokemon) {
      return fetchPokemons();
    }
    setLoading(true);
    setNotFound(false);
    setSearching(true);
    const result = await searchPokemon(pokemon);
    if(!result) {
      setNotFound(true);
      setLoading(false);
      return;
    } else {
      setPokemons([result]);
      // Cuando busque un pokemon llevar la página a 0 y el total de 1
      setPage(0);
      setTotal(1);
    }
    setLoading(false);
    setSearching(false)
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
        <Searchbar onSearch={onSearch}/>
        {notFound ?
        <div className="not-found-text">No se encontró el pokemon que buscabas 😔</div>
        :
          <Pokedex
            loading={loading} 
            pokemons={pokemons}
            page = {page}
            setPage = {setPage}
            total = {total}
          />
        }
      </div>
    </div>
    </FavoriteProvider>
  );
}
