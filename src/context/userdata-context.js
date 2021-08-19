import React, { createContext, useContext, useReducer } from "react";

const data = {
  videos: [],
  playlists: [],
};

const UserDataContext = createContext();

const reducer = (prevState, action) => {
  switch (action.type) {
    case "SET_VIDEOS": {
      return {
        ...prevState,
        videos: action.payload.videos,
      };
    }

    case "SET_PLAYLISTS": {
      return {
        ...prevState,
        playlists: action.payload.playlists,
      };
    }

    case "ADD_TO_LIKED": {
      return {
        ...prevState,
        liked: prevState.liked.concat(action.payload),
      };
    }

    case "REMOVE_FROM_LIKED": {
      return {
        ...prevState,
        liked: prevState.liked.filter((video) => video.id !== action.payload),
      };
    }

    case "ADD_NEW_PLAYLIST": {
      const tempPlaylist = {
        _id: action.payload._id,
        name: action.payload.name,
        videos: [],
      };
      return {
        ...prevState,
        playlists: prevState.playlists.concat(tempPlaylist),
      };
    }

    case "HANDLE_VIDEO_IN_PLAYLIST": {
      const { updatedPlaylist } = action.payload;
      const { playlists } = prevState;

      return {
        ...prevState,
        playlists: playlists.map((playlist) => {
          return playlist._id === updatedPlaylist._id
            ? updatedPlaylist
            : playlist;
        }),
      };
    }

    default:
      return prevState;
  }
};

export default function UserDataProvider({ children }) {
  const [{ videos, playlists }, dispatch] = useReducer(reducer, data);
  return (
    <UserDataContext.Provider value={{ videos, playlists, dispatch }}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  return useContext(UserDataContext);
}
