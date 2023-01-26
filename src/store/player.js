const SET_CURRENT_SONG = "player/setCurrentSong";

export const setCurrentSong = (id) => {
  return {
    type: SET_CURRENT_SONG,
    id: id,
  };
};

const initialState = {
  song: "",
};

export default function songReducer(state = initialState, action) {
  // const nextState = { ...state };

  switch (action.type) {
    case SET_CURRENT_SONG:
      return { ...state, song: action.id };

    default:
      return state;
  }
}
