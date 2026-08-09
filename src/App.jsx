import { useState, useEffect } from "react";
import PokeHistoryList from "./components/PokeHistoryList";
import ScoreBoard from "./components/ScoreBoard";
import GameStatus from "./components/GameStatus";
import "./App.css"

function App() {
  const [score, setScore] = useState(0);
  const [pokeName, setPokeName] = useState("");
  const [pokeHistory, setPokeHistory] = useState([]);
  const [pokeList, setPokeList] = useState([]);
  const [message, setMessage] = useState("");
  const [requiredLetter, setRequiredLetter] = useState("");
  const [gameOver, setGameOver] = useState(false);
  // const [pnum, setPnum] = useState(0);

  async function checkSubmit() {
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
        sprite: pokeData.sprites.front_default
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

  return (
    <>
      <div className="background"></div>
      <div className="screen">
        <h1>Pokemon Shiritori</h1>

        <h3>Welcome Trainer!</h3>
        {/* <h3>Pokemon Entered: {pokeName} </h3> */} 
        {/* <h3>Pokemon loaded: {pokeList.length} </h3>  */}
        {/* <input onChange={(e) => setPnum(e.target.value)}/> */}
        {/* <h3>First Pokemon: {pokeList[pnum]} </h3>  */}

        <p>
          Test your Pokemon skills!
        </p>
        <ScoreBoard score={score} gameOver = {gameOver}/>
        <GameStatus message={message} gameOver={gameOver} requiredLetter={requiredLetter}/>

        <input value={pokeName} disabled={gameOver} onChange={(e) => setPokeName(e.target.value)}/>
      
        <button disabled={gameOver} onClick={checkSubmit}>
          Enter!
        </button>
        {gameOver && 
          <button onClick={restartGame}>
            Restart
          </button>
        }

        <PokeHistoryList pokeHistory = {pokeHistory}/>
      </div>
    </>
  );
}

export default App;