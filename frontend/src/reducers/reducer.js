import { LOG_OUT, LOG_IN } from "../actions/actionTypes";

const initialUser = { username: "", isLoggedIn: false }

const initialState = {
  user: initialUser
};

export const reducer = (state = initialState, action) => {

  switch (action.type) {
    //USER
    case LOG_IN:
    return {
        ...state,
        user: {...state.user, username: action.username, isLoggedIn: true}
    }
    case LOG_OUT:
    return {
        ...initialState
    }

    default:
      return state;
  }
};