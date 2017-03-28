import axios from "axios";

export const FETCH_CURRENT_USER = "FETCH_CURRENT_USER";

const URL = "/api/current_user";

export function fetchCurrentUser() {
  const request = axios.get(URL);

  return {
    type: FETCH_CURRENT_USER,
    payload: request
  };
};