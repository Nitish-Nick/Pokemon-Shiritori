function ScoreBoard({ score, gameOver }) {
    return (
      <>
        {!gameOver && <h3>Your Score: {score}</h3>}
        {gameOver &&
            <h2>Game Over!! Your score is {score}</h2>
        }
      </>
    );
  }
  
export default ScoreBoard;