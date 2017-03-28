export const SET_REPLY = "SET_REPLY";

export function setReply(reply) {
  return {
    type: SET_REPLY,
    payload: reply
  };
};