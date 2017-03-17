import { combineReducers } from "redux";
import StoriesReducer from "./reducer_stories";
import ModalReducer from "./reducer_modal";

const rootReducer = combineReducers({
  stories: StoriesReducer,
  modal: ModalReducer
});

export default rootReducer;