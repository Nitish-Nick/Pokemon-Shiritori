function ScoreBoard({ score, gameOver }) {
    return (
      <>
        {!gameOver && <h3>Your Score: <span className="score">{score}</span></h3>}
        {gameOver &&
            <h2>Your score is <span className="score">{score}</span></h2>
        }
      </>
    );
  }
  
export default ScoreBoard;