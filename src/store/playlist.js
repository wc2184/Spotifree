import { useSelector } from "react-redux";
import csrfFetch from "./csrf";

const HYDRATE_PLAYLISTS_FOR_ONE = "playlist/hydratePlaylistsForOne";
// this is after the thunk, so the argument passed in is ACTUALLY a json blob
export const hydratePlaylistsForOne = (playlists) => {
  return {
    type: HYDRATE_PLAYLISTS_FOR_ONE,
    playlists: playlists,
  };
};

// call only this in the actual react app
export const getPlaylistsForOne = (user_id) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${user_id}/playlists`);
  const data2 = await response.clone();
  const data = await response.json();
  dispatch(hydratePlaylistsForOne(data));
  return data2;
};
export const createPlaylistForOne = (user_id, title) => async (dispatch) => {
  const response = await csrfFetch(`/api/playlists`, {
    method: "POST",
    body: JSON.stringify({ playlist: { user_id, title: title } }),
  });
  const data2 = await response.clone();
  const data = await response.json();
  // data is an object like  {id: 2}
  // dont even think you need to dispatch anything, just dispatch all hydrate
  // to update eveyrthing
  dispatch(getPlaylistsForOne(user_id));
  //   dispatch(hydratePlaylistsForOne(data));
  return data2;
  // this data2 if .json() will contain the route ('/playlists/12') for your create playlist to go to
};

const initialState = {
  list: [],
};

export default function playlistReducer(state = initialState, action) {
  // const nextState = { ...state };

  switch (action.type) {
    case HYDRATE_PLAYLISTS_FOR_ONE:
      return { ...state, list: action.playlists };

    default:
      return state;
  }
}
