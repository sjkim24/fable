import { combineReducers } from "redux";
import StoriesReducer from "./reducer_stories";
import ModalReducer from "./reducer_modal";
import CommentsReducer from "./reducer_comments";
import RepliesReducer from "./reducer_replies";

const rootReducer = combineReducers({
  stories: StoriesReducer,
  modal: ModalReducer,
  comments: CommentsReducer,
  replies: RepliesReducer
});

export default rootReducer;