import { useState, useEffect} from "react";
import PokemonCard from "./PokemonCard";
function PokeHistoryList ({pokeHistory,pokeName,onPokemonClick}) {
    const pokemon = pokeHistory[pokeHistory.length-1];
    
    let historyMessage;

    if (pokeName.trim() === "" && pokeHistory.length === 0) {
        historyMessage = "No Pokemon entered.";                         //start of the game
    } else if (pokeHistory.length === 0) {
        historyMessage = `No Pokemon starting with "${pokeName.toUpperCase()}"`;      //when any letters are typed
    } else {
        historyMessage = "Pokemon used - History:";                     //when the history is not empty and no letters are typed
    }

    return(
        <>
            {/* <h3>Last Pokemon:</h3>
            <PokemonCard pokemon = {pokemon}/> */}
            <h3>{historyMessage}</h3>
            <ul className="history-grid">
                {pokeHistory.map((pokemon) => (
                    <li key={pokemon.id} onClick={() => onPokemonClick(pokemon)}>
                        <img src={pokemon.sprite} alt={pokemon.name}/>  
                        <span className="history-name">{pokemon.name}</span>
                    </li>
                ))} 
            </ul>
        </>
    )
}
export default PokeHistoryList;