import { FETCH_STORIES } from "../actions/stories_index";

const INITIAL_STATE = { all: [], story: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_STORIES:
      return { ...state, all: action.payload.data };
    default:
      return state;
  }
}