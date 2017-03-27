import { FETCH_COMMENTS } from "../actions/comments_fetch";

const INITIAL_STATE = { all: [], comment: null };

export default function(state = INITIAL_STATE, action) {
  Object.freeze(state);
  switch(action.type) {
    case FETCH_COMMENTS:
      return { ... state, all: action.payload.data }
    default:
      return state;
  };
};