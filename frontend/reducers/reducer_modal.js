import { TOGGLE_MODAL, REFILL_MODAL } from "../actions/action_modal";

const INITIAL_STATE = { active: false, content: null };

export default function(state = INITIAL_STATE, action) {
  Object.freeze(state);
  switch(action.type) {
    case TOGGLE_MODAL:
      return { active: !state.active, content: action.payload };
    case REFILL_MODAL:
      return { active: state.active, content: action.payload};
    default:
      return state;
  }
};
