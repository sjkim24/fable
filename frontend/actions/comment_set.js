export const SET_COMMENT = "SET_COMMENT";

export function setComment(comment) {
  return {
    type: SET_COMMENT,
    payload: comment
  };
};