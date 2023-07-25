import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { uniqueWords } from "../utilities/words";

let socket;
const socketUrl = "localhost:5000";

const GameBoard = () => {
  const getRandomWord = () =>
    uniqueWords[Math.floor(Math.random() * uniqueWords.length)];
  const scrambleWord = (word) => {
    show && setShow(false);
    return word
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");
  };

  const [word, setWord] = useState(getRandomWord());
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [score, setScore] = useState(0);
  useEffect(() => {
    socket = io(socketUrl);
    if (uniqueWords.length === 0) {
      setMessage("Game Over");
    }
  }, []);
  const handleGuessChange = (event) => {
    setGuess(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (guess.toLowerCase() === word) {
      setScore((prevScore) => prevScore + 5);
      setMessage("Congratulations! You unscrambled the word!");
      removeWordFromList();
      setGuess("");
      const gamesData = {
        score,
        attempted: 153 - uniqueWords.length,
      };
      socket.emit("gamesEvent", gamesData, () => {
        setGuess("");
      });
      setTimeout(() => {
        setMessage("");
        setWord(getRandomWord());
      }, 2000);
    } else {
      setMessage("Failed");
      setShow(true);
      removeWordFromList();
      setGuess("");
      setTimeout(() => {
        setMessage("");
        setWord(getRandomWord());
      }, 5000);
    }
  };

  const removeWordFromList = () => {
    const updatedWords = uniqueWords.filter((w) => w !== word);
    uniqueWords.length = 0;
    uniqueWords.push(...updatedWords);
  };

  console.log(uniqueWords.length);
  return (
    <div className="md:h-screen">
      <div className="border border-slate-700 h-[250px] p-2 rounded-lg relative overflow-hidden">
        {/* <p>Unscramble the word below:</p> */}
        <h1 className="text-5xl text-fuchsia-600">{scrambleWord(word)}</h1>
        {message && <p className="mt-[40px]">Correct word is: {word}</p>}

        <input
          className="absolute pl-5 h-14 bottom-1 left-1 border-t border-t-slate-700 w-full outline-none"
          type="text"
          value={guess}
          disabled={message === "Failed"}
          autoFocus
          onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
          onChange={handleGuessChange}
          placeholder="Your guess..."
        />
        {/* <button onClick={handleSubmit} type="submit">
          Check
        </button> */}
      </div>
      <div className="mt-4">{message && <p>{message}</p>}</div>
      <p className="text-fuchsia-600">Your Score: {score}</p>
    </div>
  );
};

export default GameBoard;
