import axios from "axios";

export const SEARCH_ALL = "SEARCH_ALL";
export const SEARCH_USER_TAG_FOLLOWS = "SEARCH_USER_TAG_FOLLOWS";
export const SEARCH_STORIES_TAG_FORM = "SEARCH_STORIES_TAG_FORM";

const SEARCH_ALL_URL = "/api/search";
const SEARCH_TAGS_URL = "/api/tags/search";

export function searchUserTagFollows(searchTerm) {
  const request = axios.get(`/api/tags/search?search_term=${searchTerm}`);
  
  return {
    type: SEARCH_USER_TAG_FOLLOWS,
    payload: request
  };
};

export function searchStoriesTagForm(searchTerm) {
  const request = axios.get(`/api/tags/search?search_term=${searchTerm}`);
  
  return {
    type: SEARCH_STORIES_TAG_FORM,
    payload: request
  };
};

export function searchAll(searchTerm) {
  const request = axios.get(`/api/search?search_term=${searchTerm}`);
  
  return {
    type: SEARCH_ALL,
    payload: request
  }
};