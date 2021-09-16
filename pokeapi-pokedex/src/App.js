import React from "react";
import MainComponent from "./components/MainComponent";
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import PokemonDetails from "./components/PokemonDetails";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    // <MainComponent/>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MainComponent}/>
        <Route exact path="/details/:pokemon" component={PokemonDetails}/>
      </Switch>
    </BrowserRouter>
  );
}
