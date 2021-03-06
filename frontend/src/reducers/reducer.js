import { LOG_OUT, LOG_IN } from "../actions/actionTypes";

const initialUser = { data: {}, isLoggedIn: false }

const initialState = {
  user: initialUser
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    //USER
    case LOG_IN:
    let user = action.user;
    
    return {
        ...state,
        user: {...state.user, data: user, isLoggedIn: true}
    }
    case LOG_OUT:
    return {
        ...initialState
    }

    default:
      return state;
  }
};