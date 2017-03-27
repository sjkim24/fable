import axios from "axios";

export const FETCH_COMMENTS = "FETCH_COMMENTS";

const URL = "/api/stories";

export function fetchComments(storyId) {
  const request = axios.get(`${URL}/${storyId}/comments`);

  return {
    type: FETCH_COMMENTS,
    payload: request
  };
};