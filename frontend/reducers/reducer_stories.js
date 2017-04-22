import { 
  FETCH_STORY, FETCH_STORIES, SET_STORY, CREATE_STORY, 
  UPDATE_STORY, TOGGLE_IS_WRITING_STORY
} from "../actions/action_stories";

const INITIAL_STATE = { all: null, story: null, isWritingStory: false };

export default function(state = INITIAL_STATE, action) {
  Object.freeze(state);
  switch(action.type) {
    case FETCH_STORIES:
      return { ...state, all: action.payload.data };
    case FETCH_STORY:
      return { ...state, story: action.payload.data };
    case SET_STORY:
      return { ...state, story: action.payload };
    case CREATE_STORY:
      return { ...state, story: action.payload.data };
    case UPDATE_STORY:
      return { ...state, story: action.payload.data };
    case TOGGLE_IS_WRITING_STORY:
      return { ...state, isWritingStory: action.payload };
    default:
      return state;
  };
};