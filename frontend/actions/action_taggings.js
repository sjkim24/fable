import axios from "axios";

export const CREATE_TAGGINGS = "CREATE_TAGGINGS";

const URL = "/api/taggings";

export function createTaggings(tagIds, storyId, token) {
  debugger
  const request = axios.post(`${URL}`, 
    { tagging: { tag_ids: tagIds, story_id: storyId },
      authenticity_token: token
    }
  );
  
  return {
    type: CREATE_TAGGINGS,
    payload: request
  };
};