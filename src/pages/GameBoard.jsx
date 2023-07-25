import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { uniqueWords } from "../utilities/words";

let socket;
const socketUrl = "https://fun-pot-2a0ee1100e12.herokuapp.com/";

const GameBoard = () => {
  const getRandomWord = () =>
    uniqueWords[Math.floor(Math.random() * uniqueWords.length)];

  const [word, setWord] = useState(getRandomWord());
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [score, setScore] = useState(0);

  const scrambleWord = () => {
    const charArray = Array.from(word);
    for (let i = charArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [charArray[i], charArray[j]] = [charArray[j], charArray[i]];
    }
    return charArray.join("");
  };

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

  return (
    <div className="md:h-screen">
      <div className="border border-slate-700 h-[250px] p-2 rounded-lg relative overflow-hidden">
        {/* <p>Unscramble the word below:</p> */}
        <h1 className="text-5xl text-fuchsia-600">{scrambleWord()}</h1>
        {message && <p className="mt-[40px]">Correct word is: {word}</p>}
        <div className="absolute pt-1 h-14 bottom-1 left-1 border-t border-t-slate-700 w-full outline-none">
          <input
            className="h-full w-full pl-5 outline-none"
            type="text"
            value={guess}
            disabled={message === "Failed"}
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
            onChange={handleGuessChange}
            placeholder="Your guess..."
          />
          <span
            onClick={handleSubmit}
            className="h-14 absolute  bottom-[-3px] right-0 bg-fuchsia-700 text-white p-4 cursor-pointer"
          >
            Check
          </span>
        </div>
      </div>
      <div className="mt-4">{message && <p>{message}</p>}</div>
      <p className="text-fuchsia-600">Your Score: {score}</p>
    </div>
  );
};

export default GameBoard;
