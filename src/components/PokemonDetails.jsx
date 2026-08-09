import { useState } from "react";
function PokemonDetails({pokemon, onClose}){

    const [isClosing, setIsClosing] = useState(false);

    if(!pokemon){
        return null;
    }

    const Animation_duration = 300;
    
    function handleClose() {
        setIsClosing(true);

        setTimeout(() => {
        setIsClosing(false);
        onClose();
        }, Animation_duration);
    }
    return(
        <div 
            className={`details-overlay ${isClosing ? "closing" : ""}`}
            onClick = {handleClose}        
        >
            <div 
                className={`pokemon-details ${isClosing ? "closing" : ""}`}
                onClick={(e) => e.stopPropagation()}
            >
                <button id="CloseBtn" onClick={handleClose}>
                    CLOSE
                </button>
                <div className="pokeID2"> #{pokemon.id} </div>
                <h2 style={{marginTop: "30px"}}>{pokemon.name.toUpperCase()}</h2>
                <img
                    src={pokemon.sprite}
                    alt={pokemon.name}
                />
                {/* <p><strong>Type: </strong>{" "}{pokemon.types.map((type) => type.type.name).join(", ")}</p> */}

                <div className="pokemon-types">
                    {pokemon.types.map((type) => (
                        <span
                            key={type.type.name}
                            className={`type-badge type-${type.type.name}`}
                        >
                            {type.type.name.toUpperCase()}
                        </span>
                    ))}
                </div>
                <div className="pokemon-stats">
                    <p><strong>Height: </strong> {""} {pokemon.height / 10} m</p>
                    <p><strong>Weight: </strong> {""} {pokemon.weight / 10} kg</p>

                    <p><strong>Abilities: </strong>{" "}{pokemon.abilities.map((ability) => ability.ability.name).join(", ")}</p>
                </div>
                {pokemon.cry && (
                    <button className="cry-button" onClick={() => {
                        const audio = new Audio(pokemon.cry);
                        audio.play();
                    }}>
                    🔊 Cry
                    </button>
                )}
            </div>
        </div>
    )
}

export default PokemonDetails;