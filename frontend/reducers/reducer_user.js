import { 
  FETCH_USER, FETCH_FOLLOWERS, FETCH_FOLLOWINGS, FETCH_RESPONSES, UPDATE_USER,
  FETCH_TAG_FOLLOWS, FETCH_CURRENT_USER_STORIES, FETCH_CURRENT_USER_RESPONSES, CREATE_TAG_FOLLOW,
  DELETE_TAG_FOLLOW
} from  "../actions/action_user";

const INITIAL_STATE = { 
  user: null, 
  followers: [], 
  follwings: [],
  latest: [],
  recommends: [],
  responses: null,
  tagFollows: null,
  stories: null
};

export default function(state = INITIAL_STATE, action) {
  Object.freeze(state);
  switch(action.type) {
    case FETCH_USER:
      return {
        user: action.payload.data.user,
        followers: action.payload.data.followers,
        followings: action.payload.data.followings,
        latest: action.payload.data.latest,
        recommends: action.payload.data.recommends,
        responses: action.payload.data.comments
      };
    case FETCH_FOLLOWERS:
      return { ...state, followers: action.payload.data.type };
    case FETCH_FOLLOWINGS:
      return { ...state, followings: action.payload.data.type };
    case FETCH_RESPONSES:
      return { ...state, responses: action.payload.data.responses };
    case UPDATE_USER:
      return { ...state, user: action.payload.data };
    case FETCH_TAG_FOLLOWS:
      return { ...state, tagFollows: action.payload.data };
    case FETCH_CURRENT_USER_STORIES:
      return { ...state, stories: action.payload.data };
    case FETCH_CURRENT_USER_RESPONSES:
      return { ...state, responses: action.payload.data };
    case CREATE_TAG_FOLLOW:
      if (action.payload.data.error) { return { ...state }; }
      return { ...state, tagFollows: action.payload.data };
    case DELETE_TAG_FOLLOW:
      return { ...state, tagFollows: action.payload.data };
    default:
      return state;
  };
};