import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./components/app.jsx";
import StoriesIndex from "./components/stories/index.jsx";
import StoryShow from "./components/stories/show.jsx";
import UserShow from "./components/users/show.jsx";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={StoriesIndex} />
    <Route path="/users/:userName" component={UserShow} />
    <Route path="/stories/:storyId" component={StoryShow} />
  </Route>
);

