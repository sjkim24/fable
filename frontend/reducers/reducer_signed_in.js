import { SIGNED_IN } from "../actions/signed_in";

const INITIAL_STATE = { signedIn: null };

export default function(state = INITIAL_STATE, action) {
  Object.freeze(state);
  switch(action.type) {
    case SIGNED_IN:
      return { ...action.payload.data };
    default: 
      return state;
  };
};