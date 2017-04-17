import axios from "axios";

export const SEARCH_TAGS = "SEARCH_TAGS";

const SEARCH_TAGS_URL = "/api/tags/search";

export function searchTags(searchTerm) {
  const request = axios.get(`${SEARCH_TAGS_URL}?search_term=${searchTerm}`);
  
  return {
    type: SEARCH_TAGS,
    payload: request
  };
};