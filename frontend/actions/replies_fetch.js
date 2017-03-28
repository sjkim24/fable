import axios from "axios";

export const FETCH_REPLIES = "FETCH_REPLIES";

const URL = "/api/comments";

export function fetchReplies(commentId) {
  const request = axios.get(`${URL}/${commentId}/replies`);

  return {
    type: FETCH_REPLIES,
    payload: request
  };
};