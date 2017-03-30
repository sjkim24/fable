import { SET_USER, FETCH_USER } from  "../actions/action_user";

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE) {
  Object.freeze(state);
  switch(action.type) {
    case SET_USER:
      return { ...state };
    case FETCH_USER:
      return { ...state };
  };
};