import React, { useState } from "react";

import "./../GameDisplayer.css";

interface Props {
  randNum: number;
}


const GameDisplayer: React.FC<Props> = ({ randNum }) => {
  const [checkValue, setCheckValue] = useState<number | undefined>();

  //!2nd Step to show output conditionally
  const [output, setOutput] = useState<string>("Start Guessing");

  //!3rd Step to show answer instead of ?
  const [correctAnswer, setCorrectAsnswer] = useState<boolean>(false);

  //Step 4 Score & HighScore

  const [score, setScore] = useState<number>(20);

  //!Store HighScore in Memory
  const [highScore, setHighScore] = useState<number>(
    localStorage.getItem("highScore")
      ? parseInt(localStorage.getItem("highScore")!)
      : 0
  );

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckValue(parseInt(event.target.value));
  };

  const checkHandler = () => {
    if (!correctAnswer && score > 0) {
      if (typeof checkValue !== "undefined") {
        if (checkValue === randNum) {
          setOutput("Correct Guess");
          setCorrectAsnswer(true);
        } else {
          setOutput(
            checkValue > randNum ? "Guess Is Higher" : "Guess Is Lower"
          );
          setScore(score - 1);
        }

        // Check if the game is over (score is 0)
        if (score - 1 === 0) {
          setOutput("Game Over");
          setScore(0);
        }
      }
    }
  };

  React.useEffect(() => {
    if (correctAnswer) {
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("highScore", score.toString()); // Store high score in localStorage
      }
    }
  }, [correctAnswer, score, highScore]);

  //! to reset the highscore from memory
  const resetLocalStorage = () => {
    localStorage.removeItem("highScore");
    setHighScore(0); // Reset high score in the component state
  };

  const relaodGame = () => {
    window.location.reload();
  };

  return (
    <div
      className={`${
        correctAnswer ? "correctGuess" : score === 0 ? "gameOver" : `main`
      }`}
    >
      <div className="container">
        <div className="topSection">
          <div className="line"></div>
          <h1>{correctAnswer ? randNum : `?`}</h1>
          <div className="line"></div>
        </div>

        <div className="title">
          <h1>Guess My Number</h1>
        </div>

        <div className="middleSection">
          <p>
            Score: <span>{score}</span>
          </p>
          <p>
            High Score: <span>{highScore}</span>
          </p>
          <p>{output}</p>
        </div>

        <div className="inputArea">
          <input type="number" onChange={inputHandler} />
          <div className="buttons">
            <button onClick={checkHandler}>Guess</button>
            <button onClick={relaodGame}>Restart </button>
          </div>
          <button onClick={resetLocalStorage}>Reset Score </button>
        </div>
      </div>
    </div>
  );
};

export default GameDisplayer;
