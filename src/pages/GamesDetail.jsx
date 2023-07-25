import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { uniqueWords } from "../utilities/words";
import GameBoard from "./GameBoard";

let socket;

const GamesDetail = () => {
  const loc = useLocation();
  const navigate = useNavigate();
  const socketUrl = "localhost:5000";
  const [gameData, setGameData] = useState({});
  const [userList, setUserlist] = useState([]);
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([]);
  const playerName = loc.search.split("&")[0].split("=")[1];
  const gameCode = loc.search.split("&")[1].split("=")[1];

  useEffect(() => {
    socket = io(socketUrl);
    console.log(socket.id);
    socket.emit("join", { playerName, gameCode }, () => {});
    return () => {
      socket.off();
    };
  }, [socketUrl, loc.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);
  // useEffect(() => {
  //   socket.on("userList", (list) => {
  //     setUserlist([...list]);
  //   });
  // }, [userList]);

  useEffect(() => {
    socket.on("gamesEvent", (gameData) => {
      console.log(gameData);
      setGameData(gameData);
    });
  }, [gameData]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
      });
    }
  };
  console.log(messages);

  return (
    <>
      <h1 className="p-4 bg-fuchsia-500 text-white text-2xl relative">
        Scrambled Words
        <span className="absolute right-14 bg-black p-1 px-2 rounded-full text-sm">
          {playerName.slice(0, 4)}
        </span>
        <span
          onClick={() => {
            socket.off();
            navigate("/");
          }}
          className="absolute right-2 bg-red-950 p-1 px-2 rounded-full text-sm cursor-pointer"
        >
          X
        </span>
      </h1>
      <div className="md:h-screen w-full flex p-4 gap-4 pt-[30px] flex-col-reverse md:flex-row bg-[#fee2fc]">
        <div className="md:w-[300px] w-full p-4 rounded">
          <h3 className="text-xl  pb-2 border-b border-b-slate-900 mb-5">
            Leaderboard
          </h3>
          <div className="border-b py-2 border-b-slate-400 font-bold  min-w-full items-center justify-between flex-row relative">
            <p className="w-3/4">Rauf</p>
            <span className="w-1/4 text-green-700 absolute right-0 top-0 ">
              59
            </span>
          </div>
          <div className="border-b py-2 border-b-slate-400 font-bold  min-w-full items-center justify-between flex-row relative">
            <p className="w-3/4">Rauf</p>
            <span className="w-1/4 text-green-700 absolute right-0 top-0 ">
              59
            </span>
          </div>
          <div className="border-b py-2 border-b-slate-400 font-bold  min-w-full items-center justify-between flex-row relative">
            <p className="w-3/4">Rauf</p>
            <span className="w-1/4 text-green-700 absolute right-0 top-0 ">
              59
            </span>
          </div>
        </div>
        <div className="w-full md:mt-[50px]">
          {/* {userList.map((u) => (
            <span>abc</span>
          ))} */}
          <GameBoard />
        </div>
        <div className="w-[350px] hidden md:block md:mt-[13px]">
          <h3 className="text-xl  pb-2 font-bold">Chat - {gameCode}</h3>
          <div className="h-[350px] py-2 px-1 rounded-t bg-white border border-slate-400 text-sm overflow-auto">
            {messages.map(({ user, text }, i) => (
              <div
                key={i}
                className={`mb-2 text-[12px] leading-4 relative ${
                  user.toLowerCase() === playerName.toLowerCase()
                    ? "bg-green-600 ml-auto"
                    : "bg-blue-600"
                } text-white rounded-lg p-2 pt-9 w-[80%]`}
              >
                <span className="absolute top-[4px] left-[4px] bg-white text-gray-900 p-1 rounded-2xl text-[10px]">
                  {user.toUpperCase()}
                </span>
                {text}
              </div>
            ))}
          </div>
          <input
            className="h-[40px] w-full border-2 mb-4  px-2 text-[12px] text-[#333]"
            type="text"
            placeholder="Enter chat"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              e.key === "Enter" ? sendMessage(e) : null;
            }}
          />
        </div>
      </div>
    </>
  );
};

export default GamesDetail;
