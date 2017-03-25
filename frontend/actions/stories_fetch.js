import axios from "axios";

export const FETCH_STORIES = "FETCH_STORIES";

const URL = "/api/stories";

export function fetchStories() {
  const request = axios.get(`${URL}`);

  return {
    type: FETCH_STORIES,
    payload: request
  };
};