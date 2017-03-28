import { FETCH_CURRENT_USER } from "../actions/current_user_fetch";

const INITIAL_STATE = { currentUser: null };

export default function(state = INITIAL_STATE, action) {
  Object.freeze(state);
  switch(action.type) {
    case FETCH_CURRENT_USER:
      return { ...action.payload.data };
    default:
      return state;
  };
};