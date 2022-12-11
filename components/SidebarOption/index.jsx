import React from "react";

const likedStyles = {
  backgroundImage: `linear-gradient(135deg,#450af5,#c4efd9)`,
};

const playListStyle = {
  background: `#ccc`,
};

const episodeStyle = {
  background: `#006450`,
};
function index({ Icon, title, active, type, Id }) {
  const [color, setColor] = React.useState("gray");
  return (
    <div
      className={`w-full transition-all flex gap-2 items-center cursor-pointer ${
        active ? "text-white" : "text-gray-400"
      }  text-sm hover:text-white`}
    >
      {type === "link" ? (
        <span
          onMouseOver={() => setColor("white")}
          onMouseOut={() => setColor("gray")}
        >
          <Icon color={color} active={active} />
        </span>
      ) : (
        <div
          className="w-6 h-6 bg-white flex items-center justify-center rounded"
          style={
            Id === "playlist"
              ? playListStyle
              : Id === "liked"
              ? likedStyles
              : episodeStyle
          }
        >
          <Icon color={color} active={active} />
        </div>
      )}
      <span
        style={{
          fontSize: "0.875rem",
          fontWeight: "700",
        }}
      >
        {title}
      </span>
    </div>
  );
}

export default index;
