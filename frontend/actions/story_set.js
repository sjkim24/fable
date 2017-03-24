export const SET_STORY = "SET_STORY";

export function setStory(story) {
  return {
    type: SET_STORY,
    payload: story
  };
};