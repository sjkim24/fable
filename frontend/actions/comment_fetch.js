import axios from "axios";

export const FETCH_COMMENT = "FETCH_COMMENT";

const URL = "/api/comments";

export function fetchComment(id) {
  const request = axios.get(`${URL}/${id}`);
  
  return {
    type: FETCH_COMMENT,
    payload: request
  };
};