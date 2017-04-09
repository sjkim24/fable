import axios from "axios";

export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const FETCH_CURRENT_USER = "FETCH_CURRENT_USER";
export const SIGN_OUT_USER = "SIGN_OUT_USER";

const URL = "/api/current_user";

export function fetchCurrentUser() {
  const request = axios.get(URL);

  return {
    type: FETCH_CURRENT_USER,
    payload: request
  };
};

export function setAuthToken(token) {
  return {
    type: SET_AUTH_TOKEN,
    payload: token
  };
};

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

export function signOutUser(token) {
  console.log(token);
  const URL = `/users/sign_out?authenticity_token=${token}`;
  const request = axios.delete(URL);
  
  return {
    type: SIGN_OUT_USER,
    payload: request
  };
};