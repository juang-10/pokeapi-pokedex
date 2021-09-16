import React from 'react';
import FavoriteContext from '../contexts/favoritesContext';
import { Link } from 'react-router-dom';

const {useContext} = React;

const Navbar = () => {
    const {favoritePokemons} = useContext(FavoriteContext);
    console.log(favoritePokemons);

    let imgUrl = "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png";

    return (
        <nav>
            <Link to="/">
            <div/>
                <div>
                    <img src={imgUrl} alt="pokeapi-logo" className="navbar-image"/>
                </div>
            <div/>
            </Link>
            <div>❤️ {favoritePokemons.length}</div>
        </nav>
    );
};

export default Navbar;