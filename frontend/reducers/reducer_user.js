import { 
  FETCH_USER, FETCH_FOLLOWERS, FETCH_FOLLOWINGS 
} from  "../actions/action_user";

const INITIAL_STATE = { user: null, followers: null, follwings: null};

export default function(state = INITIAL_STATE, action) {
  Object.freeze(state);
  switch(action.type) {
    case FETCH_USER:
      return {
        user: action.payload.data.user,
        followers: action.payload.data.followers,
        followings: action.payload.data.followings 
      };
    case FETCH_FOLLOWERS:
      return { ...state, followers: action.payload.data.type };
    case FETCH_FOLLOWINGS:
      return { ...state, followings: action.payload.data.type };
    default:
      return state;
  };
};