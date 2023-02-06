const SET_CURRENT_SONG = "player/setCurrentSong";
const SET_QUEUE = "player/setQueue";
const SET_INDEX = "player/setIndex";
const SET_ALREADY_LISTENED = "player/setAlreadyListened";
const SET_SHUFFLE = "player/setShuffle";
const SET_REPEAT = "player/setRepeat";
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
export const setShuffle = (bool) => {
  localStorage.setItem("shuffle", bool);
  return {
    type: SET_SHUFFLE,
    shuffle: bool,
  };
};

export const setRepeat = () => (dispatch, getState) => {
  //* 0 off,
  //* 1 repeat,
  //* 2 repeat One
  let prevValue = Number(getState().player.repeat);
  let newVal = (prevValue + 1) % 3;
  localStorage.setItem("repeat", newVal); //auto converts to string
  dispatch({ type: SET_REPEAT, repeat: newVal });
  //! you can have a non async thunk if you want to access getState(), but just remember to dispatch within it. CANNOT return a object wtih type etc
};

const initialState = {
  song: "",
  queue: JSON.parse(localStorage.getItem("queue")) || [],
  alreadyListened: JSON.parse(localStorage.getItem("alreadyListened")) || [],
  index: JSON.parse(localStorage.getItem("index")) || -1,
  shuffle: localStorage.getItem("shuffle") === "true" ? true : false,
  repeat: Number(localStorage.getItem("repeat")) || 0,
};

export default function songReducer(state = initialState, action) {
  // const nextState = { ...state };

  switch (action.type) {
    case SET_CURRENT_SONG:
      console.log("REDUX ACTION SONG CHANGE", action.id);
      return { ...state, song: action.id };
    case SET_QUEUE:
      return { ...state, queue: action.queue };
    case SET_ALREADY_LISTENED:
      return { ...state, alreadyListened: action.alreadyListened };
    case SET_INDEX:
      return { ...state, index: action.index };
    case SET_SHUFFLE:
      return { ...state, shuffle: action.shuffle };
    case SET_REPEAT:
      return { ...state, repeat: action.repeat };
    default:
      return state;
  }
}
