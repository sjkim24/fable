import axios from "axios";

export const FETCH_USER = "FETCH_USER";
export const FETCH_FOLLOWERS = "FETCH_FOLLOWERS";
export const FETCH_FOLLOWINGS = "FETCH_FOLLOWINGS"
export const FETCH_RESPONSES = "FETCH_RESPONSES"
export const UPDATE_USER = "UPDATE_USER";

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

export function updateUser(user) {
  const request = axios.patch(`${URL}/${user.id}`, {
    user: { fullname: user.fullname, user_desc: user.user_desc }
  });

  return {
    type: UPDATE_USER,
    payload: request
  };
};