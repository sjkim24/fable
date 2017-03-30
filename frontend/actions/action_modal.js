export const REFILL_MODAL = "REFILL_MODAL";
export const TOGGLE_MODAL = "TOGGLE_MODAL";

export function refillModal(state) {
  return {
    type: REFILL_MODAL,
    payload: state
  };
};

export function toggleModal(state) {
  return {
    type: TOGGLE_MODAL,
    payload: state
  };
};