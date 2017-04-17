import axios from "axios";

export const SEARCH_ALL = "SEARCH_ALL";
export const SEARCH_TAGS = "SEARCH_TAGS";

const SEARCH_ALL_URL = "/api/search";
const SEARCH_TAGS_URL = "/api/tags/search";

export function searchTags(searchTerm) {
  const request = axios.get(`/api/tags/search?search_term=${searchTerm}`);
  
  return {
    type: SEARCH_TAGS,
    payload: request
  };
};

export function searchAll(searchTerm) {
  const request = axios.get("/api/search", { search_term: searchTerm });
  
  return {
    type: SEARCH_ALL,
    payload: request
  }
};