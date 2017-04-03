import axios from "axios";

export const FETCH_USER = "FETCH_USER";
export const FETCH_FOLLOWERS = "FETCH_FOLLOWERS";
export const FETCH_FOLLOWINGS = "FETCH_FOLLOWINGS"

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