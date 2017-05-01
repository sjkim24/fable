import axios from "axios";

export const FETCH_OR_CREATE_TAG = "FETCH_OR_CREATE_TAG";

const URL = "/api/tags";

export function fetchOrCreateTag(tagDesc) {
  const request = axios.get(`${URL}/fetch_or_create?tag_desc=${tagDesc}`);

  return {
    type: FETCH_OR_CREATE_TAG,
    payload: request
  };
};