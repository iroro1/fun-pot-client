import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <div className="flex min-h-screen w-full justify-center items-center bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <div className="w-[80%] md:w-[400px] mx-auto">
        <h1 className="text-[3rem] leading-6 md:text-[5rem] text-white drop-shadow-xl font-[800] pb-4">
          Fun Pot
          <small className="text-[12px] block my-3 md:mt-5">
            Multiplayer games
          </small>
        </h1>
        <Link
          to={"/games"}
          className="h-[40px] bg-green-600 text-white p-3 rounded-lg "
        >
          Join a game
        </Link>
        <Link
          to={"#"}
          className="h-[40px] bg-blue-700 text-white p-3 rounded-lg  ml-4"
        >
          Host a game
        </Link>
      </div>
    </div>
  );
};

export default Intro;
