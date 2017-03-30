import { FETCH_REPLIES } from "../actions/action_replies";

const INITIAL_STATE = { all: [] }

export default function(state = INITIAL_STATE, action) {
  Object.freeze(state);
  switch(action.type) {
    case FETCH_REPLIES:
      return { ...state, all: action.payload.data };
    default:
      return state;
  };
};