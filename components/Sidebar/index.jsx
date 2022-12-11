import React from "react";
import SidebarOption from "../SidebarOption";
import HomeIcon from "../Icons/HomeIcon";
import SearchIcon from "../Icons/SearchIcon";
import LibraryIcon from "../Icons/LibraryIcon";
import PlaylistIcon from "../Icons/PlaylistIcon";
import LikedIcon from "../Icons/LikedIcon";
import BookmarkIcon from "../Icons/BookmarkIcon";
import { connect } from "react-redux";
function Index({ playlists }) {
  return (
    <div className="bg-black py-12 px-6 hidden lg:block">
      <div className="sidebar_options">
        <ul className="flex flex-col items-start gap-3">
          <SidebarOption
            Icon={HomeIcon}
            title="Home"
            active={true}
            type="link"
            Id="home"
          />
          <SidebarOption
            Icon={SearchIcon}
            title="Search"
            type="link"
            Id="search"
          />
          <SidebarOption
            Icon={LibraryIcon}
            title="Your Library"
            type="link"
            Id="library"
          />
        </ul>
        <ul className="flex flex-col items-start gap-3 mt-8">
          <SidebarOption
            Icon={PlaylistIcon}
            title="Create Playlist"
            type="button"
            Id="playlist"
          />
          <SidebarOption
            Icon={LikedIcon}
            title="Liked Songs"
            type="button"
            Id="liked"
          />
          {playlists && (
            <SidebarOption
              Icon={BookmarkIcon}
              title="Your Episodes"
              type="button"
              Id="episodes"
            />
          )}
        </ul>
      </div>
      {playlists && <div className="border border-gray-300 my-6"></div>}
      <div
        className="user_playlist text-gray-400 text-sm"
        style={{
          fontSize: "0.875rem",
          fontWeight: "700",
        }}
      >
        <ul className="flex flex-col items-start gap-3">
          {playlists
            ? playlists.items.map((item) => (
                <li>
                  <a href="#" className="hover:text-white transition-all">
                    {item.name}
                  </a>
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
}

const napStateToProps = (state) => ({
  playlists: state.appReducer.playlists,
});

export default connect(napStateToProps, null)(Index);
