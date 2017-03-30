import { 
  FETCH_STORY, 
  FETCH_STORIES, 
  SET_STORY 
} from "../actions/action_stories";

const INITIAL_STATE = { all: [], story: null };

export default function(state = INITIAL_STATE, action) {
  Object.freeze(state);
  switch(action.type) {
    case FETCH_STORIES:
      return { ...state, all: action.payload.data };
    case FETCH_STORY:
      return { ...state, story: action.payload.data };
    case SET_STORY:
      return { ...state, story: action.payload };
    default:
      return state;
  };
};