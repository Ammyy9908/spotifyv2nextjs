import React from "react";
import { FaPlay } from "react-icons/fa";
function BlankShortcut() {
  return (
    <div className=" bg-black/50 cursor-pointer flex items-center gap-2 rounded-md group backdrop  transition-all relative">
      <div className="shortcut-left flex items-center gap-2">
        <div className="overflow-hidden shortcut-cover w-16 h-16 rounded-l-md bg-gray-300 loader"></div>
      </div>
      <div className="shortcut_right flex items-center gap-2 justify-between flex-1 px-2 relative">
        <div className="w-[130px] h-[18px] bg-gray-300 rounded-full loader"></div>
        <button className="w-12 hidden items-center justify-center rounded-full h-12 shadow-xl bg-green-500  loader group-hover:flex">
          <FaPlay />
        </button>
      </div>
    </div>
  );
}

export default BlankShortcut;
