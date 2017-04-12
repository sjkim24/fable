import axios from "axios";

export const FETCH_USER = "FETCH_USER";
export const FETCH_FOLLOWERS = "FETCH_FOLLOWERS";
export const FETCH_FOLLOWINGS = "FETCH_FOLLOWINGS"
export const FETCH_RESPONSES = "FETCH_RESPONSES"
export const UPDATE_USER = "UPDATE_USER";
export const FETCH_TAG_FOLLOWS = "FETCH_TAG_FOLLOWS";
export const FETCH_STORIES = "FETCH_STORIES";

const URL = "/api/users";

export function fetchUser(username) {
  const request = axios.get(`${URL}/${username}`);
  
  return {
    type: FETCH_USER,
    payload: request
  };
};

export function fetchFollowers(userId) {
  const request = axios.get(`${URL}/${userId}/followers`);
  
  return {
    type: FETCH_FOLLOWERS,
    payload: request
  };
};

export function fetchFollowings(userId) {
  const request = axios.get(`${URL}/${userId}/followings`);
  
  return {
    type: FETCH_FOLLOWINGS,
    payload: request
  };
};

export function fetchResponses(userId) {
  const request = axios.get(`${URL}/${userId}/responses`);
  
  return {
    type: FETCH_RESPONSES,
    payload: request
  }
};

export function updateUser(userId, data) {
  const request = axios.patch(`${URL}/${userId}`, data);

  return {
    type: UPDATE_USER,
    payload: request
  };
};

export function fetchTagFollows(userId) {
  const request = axios.get(`${URL}/${userId}/tag_follows`);
  
  return {
    type: FETCH_TAG_FOLLOWS,
    payload: request
  }
}

export function fetchStories(username) {
  const request = axios.get("/api/my_stories");
  
  return {
    type: FETCH_STORIES,
    payload: request
  }
}