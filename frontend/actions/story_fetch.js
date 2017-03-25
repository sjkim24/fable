import axios from "axios";

export const FETCH_STORY = "FETCH_STORY";

const URL = "/api/stories";

export function fetchStory(id) {
  const request = axios.get(`${URL}/${id}`);
  
  return {
    type: FETCH_STORY,
    payload: request
  };
};