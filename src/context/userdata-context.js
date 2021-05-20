import React, { createContext, useContext, useReducer } from "react";
import { playlist as initialPlaylist } from "../data/data";
import { v4 as uuidv4 } from "uuid";

const data = {
  videos: [],
  liked: [],
  playlist: initialPlaylist,
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
        id: uuidv4(),
        name: action.payload,
        videos: [],
      };
      return {
        ...prevState,
        playlist: prevState.playlist.concat(tempPlaylist),
      };
    }

    case "ADD_VIDEO_TO_PLAYLIST": {
      return {
        ...prevState,
        playlist: prevState.playlist.map((playlist) => {
          if (playlist.id === action.payload.playlistId) {
            return {
              ...playlist,
              videos: playlist.videos.concat(action.payload.video),
            };
          }
          return playlist;
        }),
      };
    }

    case "REMOVE_VIDEO_FROM_PLAYLIST": {
      return {
        ...prevState,
        playlist: prevState.playlist.map((playlist) => {
          if (playlist.id === action.payload.playlistId) {
            return {
              ...playlist,
              videos: playlist.videos.filter(
                (item) => item.id !== action.payload.videoId
              ),
            };
          }
          return playlist;
        }),
      };
    }

    default:
      return prevState;
  }
};

export default function UserDataProvider({ children }) {
  const [{ videos, liked, playlist }, dispatch] = useReducer(reducer, data);
  return (
    <UserDataContext.Provider value={{ videos, liked, playlist, dispatch }}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  return useContext(UserDataContext);
}
