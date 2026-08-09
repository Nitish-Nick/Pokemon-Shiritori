import PokemonCard from "./PokemonCard";
function PokeHistoryList ({pokeHistory}) {
    const pokemon = pokeHistory[pokeHistory.length-1];
    return(
        <>
            <h3>Last Pokemon:</h3>
            <PokemonCard pokemon = {pokemon}/>
            <h3>Pokemon used - History:</h3>
            <ul>
                {pokeHistory.map((pokemon) => (
                    <li key={pokemon.id}>
                        <img src={pokemon.sprite} alt={pokemon.name}/>  
                        <span>{pokemon.name}</span>
                    </li>
                ))} 
            </ul>
        </>
    )
}
export default PokeHistoryList;