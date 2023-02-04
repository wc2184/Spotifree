const SET_CURRENT_SONG = "player/setCurrentSong";
const SET_QUEUE = "player/setQueue";
const SET_INDEX = "player/setIndex";
const SET_ALREADY_LISTENED = "player/setAlreadyListened";
export const setCurrentSong = (id) => {
  return {
    type: SET_CURRENT_SONG,
    id: id,
  };
};

// run whenever you click a song from a playlist, or from search
export const setQueue = (array) => {
  localStorage.setItem("queue", JSON.stringify(array));
  return {
    type: SET_QUEUE,
    queue: array,
  };
};
export const setIndex = (num) => {
  localStorage.setItem("index", JSON.stringify(num));
  return {
    type: SET_INDEX,
    index: num,
  };
};
// (array of numbers) append a new song that hasn't been listened to
export const setAlreadyListened = (array) => {
  localStorage.setItem("alreadyListened", JSON.stringify(array));
  return {
    type: SET_ALREADY_LISTENED,
    alreadyListened: array,
  };
};

const initialState = {
  song: "",
  queue: JSON.parse(localStorage.getItem("queue")) || [],
  alreadyListened: JSON.parse(localStorage.getItem("alreadyListened")) || [],
  index: JSON.parse(localStorage.getItem("index")) || -1,
};

export default function songReducer(state = initialState, action) {
  // const nextState = { ...state };

  switch (action.type) {
    case SET_CURRENT_SONG:
      return { ...state, song: action.id };
    case SET_QUEUE:
      return { ...state, queue: action.queue };
    case SET_ALREADY_LISTENED:
      return { ...state, alreadyListened: action.alreadyListened };
    case SET_INDEX:
      return { ...state, index: action.index };
    default:
      return state;
  }
}
