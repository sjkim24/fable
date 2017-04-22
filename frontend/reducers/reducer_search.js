import { 
  SEARCH_ALL, SEARCH_TAGS, SEARCH_USER_TAG_FOLLOWS, SEARCH_STORIES_TAG_FORM
} from "../actions/action_search";

const INITIAL_STATE = { 
  all: null, userTagFollowsSearch: [], storiesTagFormSearch: []
};

export default function(state = INITIAL_STATE, action) {
  Object.freeze(state);
  switch(action.type) {
    case SEARCH_USER_TAG_FOLLOWS:
      return { ...state, userTagFollowsSearch: action.payload.data };
    case SEARCH_STORIES_TAG_FORM:
      return { ...state, storiesTagFormSearch: action.payload.data };
    case SEARCH_ALL:
      return { ...state, all: action.payload.data };
    default:
      return state;
  };
};