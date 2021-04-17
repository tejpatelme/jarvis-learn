import React, { createContext, useContext, useReducer } from "react";
import { playlist as initialPlaylist } from "../data/data";
import { v4 as uuidv4 } from "uuid";

const data = {
  liked: [],
  playlist: initialPlaylist,
};

const UserDataContext = createContext();

const reducer = (prevState, action) => {
  switch (action.TYPE) {
    case "ADD_TO_LIKED": {
      return {
        ...prevState,
        liked: prevState.liked.concat(action.PAYLOAD),
      };
    }

    case "REMOVE_FROM_LIKED": {
      return {
        ...prevState,
        liked: prevState.liked.filter((video) => video.id !== action.PAYLOAD),
      };
    }

    case "ADD_NEW_PLAYLIST": {
      const tempPlaylist = {
        id: uuidv4(),
        name: action.PAYLOAD,
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
          if (playlist.id === action.PAYLOAD.playlistId) {
            return {
              ...playlist,
              videos: playlist.videos.concat(action.PAYLOAD.video),
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
          if (playlist.id === action.PAYLOAD.playlistId) {
            return {
              ...playlist,
              videos: playlist.videos.filter(
                (item) => item.id !== action.PAYLOAD.videoId
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
  const [{ liked, playlist }, dispatch] = useReducer(reducer, data);
  return (
    <UserDataContext.Provider value={{ liked, playlist, dispatch }}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  return useContext(UserDataContext);
}
