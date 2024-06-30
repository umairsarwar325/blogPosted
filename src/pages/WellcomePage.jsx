import React from "react";
import { Button } from "../components/index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const WellcomePage = () => {
  return (
    <div className="w-full h-[70%] flex items-center justify-center ">
      <div className="w-[80%] h-full flex flex-col items-center p-20">
        <div className="flex flex-col gap-1 font-bold text-3xl tracking-light">
          <h1 className="text-zinc-600"> your thoughts...</h1>
          <h1 className="text-zinc-500">your blogs...</h1>
          <h1 className="text-zinc-400">blogPosting...</h1>
          <h1 className="text-zinc-300">blogPosted</h1>
        </div>
        <Link to="/login">
          <Button clasName="rounded-xl mt-10">Login</Button>
        </Link>
        <p className="mt-2 text-center text-base text-zinc-400">
          Login to read blogs
        </p>
      </div>
    </div>
  );
};

export default WellcomePage;
