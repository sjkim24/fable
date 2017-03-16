// copy paste

export const TOGGLE_MODAL = "TOGGLE_MODAL";

export function toggleModal(content) {
  return {
    type: TOGGLE_MODAL,
    payload: content
  };
};