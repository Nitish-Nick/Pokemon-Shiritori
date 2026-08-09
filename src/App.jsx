import { useState, useEffect } from "react";
import PokeHistoryList from "./components/PokeHistoryList";
import ScoreBoard from "./components/ScoreBoard";
import GameStatus from "./components/GameStatus";
import PokemonCard from "./components/PokemonCard";
import PokemonDetails from "./components/PokemonDetails";
import "./App.css"

function App() {
  const [score, setScore] = useState(0);
  const [pokeName, setPokeName] = useState("");
  const [pokeHistory, setPokeHistory] = useState([]);
  const [pokeList, setPokeList] = useState([]);
  const [message, setMessage] = useState("");
  const [requiredLetter, setRequiredLetter] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  
  // const [pnum, setPnum] = useState(0);

  const lastPokemon = pokeHistory[pokeHistory.length-1];

  async function checkSubmit() {
    event.preventDefault();
    // console.log(pokeHistory);
    const pokemon = pokeName
    .trim()
    .toLowerCase();
    


    if(gameOver){
      return;
    }
    
    if(!pokemon){
      setMessage("Please enter a Pokemon");
      return;
    }
    
    if(!pokeList.includes(pokemon)){
      setMessage("Not a valid Pokemon.");
      setGameOver(true);
      return;
    }
    
    if(pokeHistory.some(
      (entry) => entry.name === pokemon
    )){
      setMessage("Pokemon already used, Please enter a different one.");
      setGameOver(true);
      return;
    }
    
    if(requiredLetter &&
      pokemon[0] !== requiredLetter){
        setMessage(`Pokemon must start with "${requiredLetter.toUpperCase()}"`);
        setGameOver(true);
        return;
      }
      
    const nextLetter = pokemon[pokemon.length -1];
    const pokeData = await getPokeData(pokemon);

    setScore((prev) => prev +1);
    setPokeName("");
    setPokeHistory((prev) => [...prev,
      {
        id: pokeData.id,
        name: pokeData.name,
        sprite: pokeData.sprites.front_default,
        types: pokeData.types,
        height: pokeData.height,
        weight: pokeData.weight,
        abilities: pokeData.abilities,
        cry: pokeData.cries.latest
      }
    ]);
    setRequiredLetter(nextLetter);
    setMessage(`Great Answer!`);
  }

  function restartGame(){
    setScore(0);
    setPokeName("");
    setPokeHistory([]);
    setMessage("");
    setRequiredLetter("");
    setGameOver(false);
  }

  useEffect(() => {
    async function loadPokeList() {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=2000"
      );

      const data = await response.json();
      const pokeNames = data.results.map(
        (pokeName) => pokeName.name
      );
      console.log(pokeNames);
      setPokeList(pokeNames)      
    }
    loadPokeList();
    console.log("Pokemon List Added.");
  },[]);

  async function getPokeData(names) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${names}`
    );
    console.log("Pokemon Sprites Added.")
    return response.json();
  }

  const filteredHistory = pokeHistory.filter((pokemon) =>
    pokemon.name.startsWith(pokeName.trim().toLowerCase())
  );

  return (
    <>
      <div className="background"></div>
      <div className="app-container">
        <div className="top-section">
          <div className="left-panel">
            <h1 id="Game-Title">Pokemon Shiritori</h1>

            <h3>Welcome, Trainer!</h3>
            {/* <h3>Pokemon Entered: {pokeName} </h3> */} 
            {/* <h3>Pokemon loaded: {pokeList.length} </h3>  */}
            {/* <input onChange={(e) => setPnum(e.target.value)}/> */}
            {/* <h3>First Pokemon: {pokeList[pnum]} </h3>  */}

            <p>Test your Pokemon skills!</p>
            <ScoreBoard score={score} gameOver = {gameOver}/>
            <GameStatus message={message} gameOver={gameOver} requiredLetter={requiredLetter}/>

            <div className="input-section">
              <form onSubmit={checkSubmit} className="input-section">
                <input id="InputName" value={pokeName} disabled={gameOver} onChange={(e) => setPokeName(e.target.value)}/>
              
                <button id="Enter" disabled={gameOver}>
                  Enter!
                </button>
              {gameOver && 
                <button id="Restart" type = "button" onClick={restartGame}>
                  Restart!
                </button>
              }
            </form>
          </div>
          </div>
          <div className="right-panel">
            {/* <h3>Last Pokemon:</h3> */}
            <PokemonCard 
              pokemon = {lastPokemon}
              onClick={() => setSelectedPokemon(lastPokemon)}
            />
          </div>
        </div>
        <div className="bottom-section">
          <PokeHistoryList 
            pokeHistory = {filteredHistory} 
            pokeName = {pokeName}
            onPokemonClick = {setSelectedPokemon}
          />
        </div>
        <PokemonDetails
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
        />
      </div>
      <footer className="disclaimer">
        Pokémon and Pokémon character names are trademarks of Nintendo,
        Game Freak, and The Pokémon Company. This is a fan-made project
        and is not affiliated with or endorsed by them.
      </footer>
    </>
  );
}

export default App;