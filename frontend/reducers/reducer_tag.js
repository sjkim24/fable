import { FETCH_OR_CREATE_TAG } from "../../actions/action_tag";

const INITIAL_STATE = null;

export default function(state = INITIAL_STATE, action) {
  Object.freeze(state);
  switch(action.type) {
    case FETCH_OR_CREATE_TAG:
      return { action.payload.data };
  };
};