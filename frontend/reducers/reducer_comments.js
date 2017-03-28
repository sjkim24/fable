import { FETCH_COMMENTS } from "../actions/comments_fetch";
import { FETCH_COMMENT } from "../actions/comment_fetch";
import { SET_COMMENT } from "../actions/comment_set";

const INITIAL_STATE = { all: [], comment: null };

export default function(state = INITIAL_STATE, action) {
  Object.freeze(state);
  switch(action.type) {
    case FETCH_COMMENTS:
      return { ...state, all: action.payload.data };
    case FETCH_COMMENT:
      return { ...state, comment: action.payload.data };
    case SET_COMMENT:
      return { ...state, comment: action.payload };
    default:
      return state;
  };
};