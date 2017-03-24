import { FETCH_STORIES } from "../actions/stories_fetch";
import { SET_STORY } from "../actions/story_set";

const INITIAL_STATE = { all: [], story: null };

export default function(state = INITIAL_STATE, action) {
  Object.freeze(state);
  switch(action.type) {
    case FETCH_STORIES:
      return { ...state, all: action.payload.data };
    case SET_STORY:
      return { ...state, story: action.payload }
    default:
      return state;
  }
}