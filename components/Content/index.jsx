import React from "react";

function Content({ children, setScroll, color }) {
  console.log(color);
  const handleScroll = (e) => {
    //get the scroll position
    const position = e.target.scrollTop;
    //set the scroll position
    setScroll(position);
  };
  return (
    <div
      className="w-full h-full overflow-scroll content transition-all"
      style={{
        backgroundImage: `linear-gradient(${color} 0,#222222 100%),url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDMwMHYzMDBIMHoiLz48L3N2Zz4=);`,
      }}
      onScroll={handleScroll}
    >
      {children}
    </div>
  );
}

export default Content;
