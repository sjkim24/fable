import { combineReducers } from "redux";
import StoriesReducer from "./reducer_stories.jsx";

const rootReducer = combineReducers({
  stories: StoriesReducer
});

export default rootReducer;