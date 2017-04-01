import { SET_USER, FETCH_USER } from  "../actions/action_user";

const INITIAL_STATE = { user: null };

export default function(state = INITIAL_STATE, action) {
  Object.freeze(state);
  switch(action.type) {
    case FETCH_USER:
      return { user: action.payload.data };
    default:
      return state;
  };
};