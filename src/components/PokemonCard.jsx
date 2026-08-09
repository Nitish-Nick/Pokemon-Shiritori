function PokemonCard({pokemon, onClick}){

    if(!pokemon){
        return null;
    }

    return(
        <div className = "pokemon-card" onClick={onClick}>
            <div className="pokeID"> #{pokemon.id} </div>
            <img className="pokemon-img"
                src={pokemon.sprite} 
                alt={pokemon.name}
            />
            <h2 className="pokemon-name">{pokemon.name.toUpperCase()}</h2>
        </div>
    )
}
export default PokemonCard;