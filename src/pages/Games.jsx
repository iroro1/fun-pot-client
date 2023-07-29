import { ClickAwayListener } from "@mui/base";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Games = () => {
  const navigate = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    console.log(sessionStorage.getItem("reload"));
    if (loc?.state?.reload) {
      if (
        !sessionStorage.getItem("reload") ||
        sessionStorage.getItem("reload") === false
      ) {
        sessionStorage.setItem("reload", true);
        window.location.reload();
      }
    }

    return () => {
      // sessionStorage.removeItem("reload");
    };
  }, []);
  const games = [
    {
      id: 1,
      gameTitle: "Scambled Words",
      img: "https://wellgames.com/storage/uploads/screenshots/jpg/scramble-words_1610716562_0.jpg",
      url: "/games/scrambled-words",
    },
    {
      id: 2,
      gameTitle: "Hangman",
      img: "data:image/png;base64,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",
      url: "",
    },
    {
      id: 3,
      gameTitle: "Tic Tac Toe",
      img: "data:image/jpeg;base64,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",
      url: "",
    },
  ];
  const [modal, setModal] = useState(false);
  const [data, setData] = useState({});

  const submit = () => {
    // socket code to join room
    if (data.playerName || data.gameCode) {
      const url =
        data?.selected?.url +
        "?playerName=" +
        data.playerName +
        "&gameCode=" +
        data.gameCode;

      navigate(url);
    }
  };

  return (
    <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 min-h-screen w-full relative">
      <div className="container p-[5%]">
        <h1 className="text-2xl text-red-50 font-bold">Games List</h1>
        <small className=" text-red-50 text-sm">
          Pick your game and enter the code given by the host.
        </small>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-between mt-10">
          {games.map((game) => (
            <div
              className="h-[250px] mx-auto w-[300px] overflow-hidden bg-white rounded-t-lg cursor-pointer hover:opacity-90 active:shadow-md"
              key={game.id}
              onClick={() => {
                setData({ ...data, selected: game });
                setModal(!modal);
              }}
            >
              <img
                className="w-full h-[200px] object-cover"
                src={game.img}
                alt=""
              />
              <h5 className="m-3 font-[600] border-teal-200">
                {game.gameTitle}
              </h5>
            </div>
          ))}
        </div>
      </div>
      {modal && (
        <div className="h-[100vh]  w-full flex justify-center items-center bg-[#00000050] absolute top-0 left-0 z-10">
          <ClickAwayListener onClickAway={() => setModal(false)}>
            <div className="min-h-[250px] pb-6 w-[300px] bg-white mx-6 rounded-xl">
              <h4 className="text-center mt-3 font-[700] ">Join</h4>
              <h4 className="text-center mt-3 font-[500] text-2xl text-red-500">
                {data?.selected?.gameTitle}
              </h4>

              <div className="flex flex-col px-5 mt-4">
                <input
                  className="h-[40px] border mb-4 rounded-md px-2 text-[12px] text-[#333]"
                  type="text"
                  placeholder="Enter your Username"
                  required
                  // value={data?.playerName}
                  onChange={(e) =>
                    setData({ ...data, playerName: e.target.value })
                  }
                />
                <input
                  className="h-[40px] border mb-4 rounded-md px-2 text-[12px] text-[#333]"
                  type="text"
                  placeholder="Enter Game room code"
                  // value={data?.gameCode}
                  onChange={(e) =>
                    setData({ ...data, gameCode: e.target.value })
                  }
                  required
                />

                <button
                  disabled={!data?.playerName || !data?.gameCode}
                  onClick={submit}
                  className="hover:opacity-95 bg-green-600 text-white py-3 rounded-lg text-center disabled:bg-gray-300"
                >
                  Join Game
                </button>
              </div>
            </div>
          </ClickAwayListener>
        </div>
      )}
    </div>
  );
};

export default Games;
