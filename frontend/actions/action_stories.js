import axios from "axios";

export const FETCH_STORY = "FETCH_STORY";
export const SET_STORY = "SET_STORY";
export const FETCH_STORIES = "FETCH_STORIES";
export const FETCH_STORIES_BY_TAG = "FETCH_STORIES_BY_TAG";
export const CREATE_STORY = "CREATE_STORY";
export const UPDATE_STORY = "UPDATE_STORY";
export const TOGGLE_IS_WRITING_STORY = "TOGGLE_IS_WRITING_STORY";

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

export function fetchStoriesByTag(tag) {
  const request = axios.get(`${URL}/?tag=${tag}`);
  
  return {
    type: FETCH_STORIES_BY_TAG,
    payload: request
  };
};

export function createStory(data) {
  const request = axios.post(`${URL}`, data);
  
  return {
    type: CREATE_STORY,
    payload: request
  };
};

export function updateStory(storyId, data) {
  const request = axios.patch(`${URL}/${storyId}`, data);
   
  return {
    type: UPDATE_STORY,
    payload: request
  };
};

export function toggleIsWritingStory(data) {
  return {
    type: TOGGLE_IS_WRITING_STORY,
    payload: data
  };
};