import axios from "axios";

export const FETCH_USER = "FETCH_USER";
export const SET_USER = "SET_USER";

const URL = "/api/users";

export function fetchUser(id) {
  const request = axios.get(`${URL}/${id}`);
  
  return {
    type: FETCH_USER,
    playload: user
  };
};

export function setUser(user) {
  return {
    type: SET_USER,
    playload: user
  };
};