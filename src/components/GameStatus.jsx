function GameStatus({ message, gameOver, requiredLetter }) {
    let messageClass = "";

    if (gameOver){
        messageClass = "status-error";
    }else if(message === "Great Answer!"){
        messageClass = "status-success";
    }
    return (
        <>
            {message && <h3 className={messageClass}>{message}</h3>}
            
            {!gameOver && (
            <h3>
                Next Pokemon must start with: <span className="requiredLetter">
                {requiredLetter
                ? ` ${requiredLetter.toUpperCase()}`
                : " Any Letter"
                }
                </span>
            </h3>
            )}

            {gameOver && (
                <h2 className="game-over">
                    GAME OVER!!
                </h2>
            )}
        </>
    );
  }
  
export default GameStatus;