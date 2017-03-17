export const REFILL_MODAL = "REFILL_MODAL";

export function refillModal(state) {
  return {
    type: REFILL_MODAL,
    payload: state
  };
};