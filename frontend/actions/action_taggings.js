import axios from "axios";

export const CREATE_TAGGINGS = "CREATE_TAGGINGS";
export const UPDATE_TAGGINGS = "UPDATE_TAGGINGS";

const URL = "/api/taggings";

export function createTaggings(tagIds, storyId, token) {
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

export function updateTaggings(tagIds, storyId, token) {
  const request = axios.patch(`${URL}`,
    { tagging: { tag_ids: tagIds, story_id: storyId },
      authenticity_token: token
    }
  );
  
  return {
    type: UPDATE_TAGGINGS,
    payload: request
  };
};