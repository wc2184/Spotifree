import csrfFetch from "./csrf";

const SET_CURRENT_USER = "session/setCurrentUser";
const REMOVE_CURRENT_USER = "session/removeCurrentUser";

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
};

export const removeCurrentUser = () => {
  return {
    type: REMOVE_CURRENT_USER,
  };
};

const initialState = {
  user: JSON.parse(sessionStorage.getItem("currentUser")),
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ credential, password }),
  });
  const data2 = await response.clone();
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return data2;
};
export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });
  const data2 = await response.clone(); // THIS IS KEY CRUX, CLONE THAT SHIT BEFORE YOU SENT IT
  const data = await response.json();

  //   console.log(data, "this is data from signup");
  console.log(data.errors === undefined);
  if (data.errors !== undefined) {
    console.log("didnt make one");

    storeCurrentUser(false);
    dispatch(setCurrentUser(null));
  } else {
    console.log("did make one");
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
  }

  //   storeCurrentUser(data.user);

  console.log(response, "this is response in the thing");
  return data2;
};

export const logout = (user) => async (dispatch) => {
  const res = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  const data = await res.json();
  console.log(data, "should be success is logged out");
  storeCurrentUser(false);
  dispatch(setCurrentUser(data.user));
};

export const restoreSession = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  storeCSRFToken(response);
  const data = await response.json();
  console.log(data, "this is data");
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return response;
};

export const storeCurrentUser = (user) => {
  if (user) {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
  } else {
    sessionStorage.removeItem("currentUser");
  }
};

export default function sessionReducer(state = initialState, action) {
  // const nextState = { ...state };

  switch (action.type) {
    case SET_CURRENT_USER:
      // nextState[action.payload.id] = action.payload;
      // return nextState;
      return { ...state, user: action.payload };
    case REMOVE_CURRENT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}

export function storeCSRFToken(response) {
  const csrfToken = response.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}
