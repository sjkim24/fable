import axios from "axios";

export const FETCH_CURRENT_USER = "FETCH_CURRENT_USER";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

const URL = "/api/current_user";

export function fetchCurrentUser() {
  const request = axios.get(URL);
  console.log("change this to fetch from state; action_auth.js");
  return {
    type: FETCH_CURRENT_USER,
    payload: request
  };
};

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    payload: user
  }
};