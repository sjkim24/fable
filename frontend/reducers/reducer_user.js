import { 
  FETCH_USER, FETCH_FOLLOWERS, FETCH_FOLLOWINGS, FETCH_RESPONSES 
} from  "../actions/action_user";

const INITIAL_STATE = { 
  user: null, 
  followers: [], 
  follwings: [],
  responses: []
};

export default function(state = INITIAL_STATE, action) {
  Object.freeze(state);
  switch(action.type) {
    case FETCH_USER:
      return {
        user: action.payload.data.user,
        followers: action.payload.data.followers,
        followings: action.payload.data.followings,
        responses: action.payload.data.comments
      };
    case FETCH_FOLLOWERS:
      return { ...state, followers: action.payload.data.type };
    case FETCH_FOLLOWINGS:
      return { ...state, followings: action.payload.data.type };
    case FETCH_RESPONSES:
      return { ...state, responses: action.payload.data.responses };
    default:
      return state;
  };
};