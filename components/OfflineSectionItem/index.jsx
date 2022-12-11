import React from "react";
import { FaPlay } from "react-icons/fa";

function hexToRgbA(hex) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ",.6)"
    );
  }
  throw new Error("Bad Hex");
}

function OfflineSectionItem({
  cover,
  title,
  type,
  color,
  setGradient,
  setBanner,
}) {
  console.log(setBanner);
  return (
    <div
      className="w-full cursor-pointer  h-[215px] relative group overflow-hidden rounded-md"
      onMouseOver={() => setGradient(hexToRgbA(color))}
    >
      <img
        src={cover}
        alt="section-item-thumb"
        className="transition-all group-hover:scale-110 section-item-image rounded-md absolute w-full h-full object-cover"
      />
      <div
        className="section-item-footer  absolute z-10 backdrop-blur-xl  bottom-0 w-full h-[80px] transition-all rounded-l-b-md rounded-r-b-md opacity-0 group-hover:opacity-100"
        style={{
          backgroundColor: color ? `${hexToRgbA(color)}` : "#000000",
        }}
      >
        <div className="section-content mt-6 ml-2">
          <h2 className="font-bold text-white">{title}</h2>
          <p className="text-white text-sm">{type}</p>
        </div>
        <button
          className="flex section-item-play-btn absolute right-5 transition-all top-5 group-hover:-top-6 group-hover:shadow-2xl opacity-0 group-hover:opacity-100 rounded-full  items-center justify-center w-12 h-12 bg-green-500"
          onClick={() => setBanner(true)}
        >
          <FaPlay />
        </button>
      </div>
    </div>
  );
}

export default OfflineSectionItem;
