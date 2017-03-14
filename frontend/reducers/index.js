import { combineReducers } from "redux";
import StoriesReducer from "./reducer_stories";

const rootReducer = combineReducers({
  stories: StoriesReducer
});

export default rootReducer;