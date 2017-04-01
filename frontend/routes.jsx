import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./components/app.jsx";
import StoriesIndex from "./components/stories/stories_index.jsx";
import StoriesShow from "./components/stories/stories_show.jsx";
import UsersShow from "./components/users/users_show.jsx";
import CommentsShow from "./components/comments/comments_show.jsx";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={StoriesIndex} />
    <Route path="/users/:username" component={UsersShow} />
    <Route path="/stories/:storyId" component={StoriesShow} />
    <Route path="/comments/:commentId" component={CommentsShow} />
  </Route>
);

