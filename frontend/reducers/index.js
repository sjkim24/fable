import { combineReducers } from "redux";
import StoriesReducer from "./reducer_stories";
import ModalReducer from "./reducer_modal";
import CommentsReducer from "./reducer_comments";

const rootReducer = combineReducers({
  stories: StoriesReducer,
  modal: ModalReducer,
  comments: CommentsReducer
});

export default rootReducer;