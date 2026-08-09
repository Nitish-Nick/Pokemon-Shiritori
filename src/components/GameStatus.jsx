function GameStatus({ message, gameOver, requiredLetter }) {
    return (
        <>
            {message && <h3>{message}</h3>}
            
            {!gameOver && 
            <h3>Next Pokemon must start with: 
                {requiredLetter
                ? ` ${requiredLetter.toUpperCase()}`
                : " Any Letter"
                }
            </h3>
            }
        </>
    );
  }
  
export default GameStatus;