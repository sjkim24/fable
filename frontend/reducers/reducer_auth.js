import { 
  SET_CURRENT_USER, SET_AUTH_TOKEN, FETCH_CURRENT_USER 
} from "../actions/action_auth";

const INITIAL_STATE = { currentUser: null, authToken: "" };

export default function(state = INITIAL_STATE, action) {
  Object.freeze(state);
  switch(action.type) {
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.payload.data };
    case SET_AUTH_TOKEN:
      return { ...state, authToken: action.payload };
    case FETCH_CURRENT_USER:
      return { ...state, currentUser: action.payload.data };
    default:
      return state;
  };
};