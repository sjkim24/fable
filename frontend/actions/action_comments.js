import axios from "axios";

export const FETCH_COMMENT = "FETCH_COMMENT";
export const SET_COMMENT = "SET_COMMENT";
export const FETCH_COMMENTS = "FETCH_COMMENTS";

const COMMENTS_URL = "/api/comments";
const STORIES_URL = "/api/stories";

export function fetchComment(id) {
  const request = axios.get(`${COMMENTS_URL}/${id}`);
  
  return {
    type: FETCH_COMMENT,
    payload: request
  };
};

export function setComment(comment) {
  return {
    type: SET_COMMENT,
    payload: comment
  };
};


export function fetchComments(storyId) {
  const request = axios.get(`${STORIES_URL}/${storyId}/comments`);

  return {
    type: FETCH_COMMENTS,
    payload: request
  };
};