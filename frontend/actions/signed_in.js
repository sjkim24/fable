import axios from "axios";

export const SIGNED_IN = "SIGNED_IN";

const URL = "/auth/is_signed_in.json";

export function fetchAuthStatus() {
  const request = axios.get(URL);
  
  return {
    type: SIGNED_IN,
    payload: request
  };
}