import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./components/app.jsx";
import StoriesIndex from "./components/stories/stories_index.jsx";
import StoriesShow from "./components/stories/stories_show.jsx";
import StoriesForm from "./components/stories/stories_form.jsx";
import StoriesEdit from "./components/stories/stories_edit.jsx";
import CommentsShow from "./components/comments/comments_show.jsx";
import CommentsEdit from "./components/comments/comments_edit.jsx";
import UsersShow from "./components/users/users_show.jsx";
import UsersTagFollowsForm from "./components/users/users_tag_follows_form.jsx";
import UsersStoriesIndex from "./components/users/users_stories_index.jsx";
import UsersCommentsIndex from "./components/users/users_comments_index.jsx";
import SearchIndex from "./components/search/search_index.jsx";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={StoriesIndex} />
    <Route path="/users/:username" component={UsersShow} />
    <Route path="/stories/:storyId" component={StoriesShow} />
    <Route path="/stories/:storyId/edit" component={StoriesEdit} />
    <Route path="/comments/:commentId" component={CommentsShow} />
    <Route path="/comments/:commentId/edit" component={CommentsEdit} />
    <Route path="/new_story" component={StoriesForm} />
    <Route path="/users/me/edit_tag_follows" component={UsersTagFollowsForm} />
    <Route path="/users/me/my_stories" component={UsersStoriesIndex} />
    <Route path="/users/me/my_responses" component={UsersCommentsIndex} />
    <Route path="/search" component={SearchIndex} />
  </Route>
);

