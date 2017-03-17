export const TOGGLE_MODAL = "TOGGLE_MODAL";

export function toggleModal(state) {
  return {
    type: TOGGLE_MODAL,
    payload: state
  };
};