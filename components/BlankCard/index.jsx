import React from "react";
import { FaPlay } from "react-icons/fa";
function BlankCard() {
  return (
    <div className="w-full cursor-pointer  h-[215px] relative group overflow-hidden rounded-md bg-white/50 loader">
      <div className="pb-3 section-item-footer  absolute z-10  bottom-0 w-full h-[80px] transition-all rounded-l-b-md rounded-r-b-md bg-white/30">
        <div className="section-content mt-6 ml-2 flex flex-col items-start gap-2 ">
          <h2 className="w-[110px] h-[12px] bg-white"></h2>
          <p className="w-[70px] h-[12px] bg-white mt-1"></p>
        </div>
        <button className="flex section-item-play-btn absolute right-5 transition-all -top-6   rounded-full  items-center justify-center w-12 h-12 bg-green-500">
          <FaPlay />
        </button>
      </div>
    </div>
  );
}

export default BlankCard;
