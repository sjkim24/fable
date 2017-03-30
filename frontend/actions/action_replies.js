import axios from "axios";

export const FETCH_REPLIES = "FETCH_REPLIES";
export const SET_REPLY = "SET_REPLY";

const URL = "/api/comments";

export function setReply(reply) {
  return {
    type: SET_REPLY,
    payload: reply
  };
};

export function fetchReplies(commentId) {
  const request = axios.get(`${URL}/${commentId}/replies`);

  return {
    type: FETCH_REPLIES,
    payload: request
  };
};
