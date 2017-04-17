import { SEARCH_TAGS } from "../actions/action_search";

const INITIAL_STATE = { all: null, tags: [] };

export default function(state = INITIAL_STATE, action) {
  Object.freeze(state);
  switch(action.type) {
    case SEARCH_TAGS:
      return { ...state, tags: action.payload.data };
    default:
      return state;
  };
};