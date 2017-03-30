import axios from "axios";

export const FETCH_STORY = "FETCH_STORY";
export const SET_STORY = "SET_STORY";
export const FETCH_STORIES = "FETCH_STORIES";

const URL = "/api/stories";

export function fetchStory(id) {
  const request = axios.get(`${URL}/${id}`);
  
  return {
    type: FETCH_STORY,
    payload: request
  };
};

export function setStory(story) {
  return {
    type: SET_STORY,
    payload: story
  };
};

export function fetchStories() {
  const request = axios.get(`${URL}`);

  return {
    type: FETCH_STORIES,
    payload: request
  };
};