json.id @comment.id
json.story_id @comment.story.id
json.user_id @comment.user_id
json.user_image_url @comment.user.photo.url
json.username @comment.user.username
json.user_fullname @comment.user.fullname
json.user_desc @comment.user.user_desc
json.published_date @comment.published_date
json.content @comment.content
json.tags @comment.story.tags do |tag|
  json.tag_desc tag.tag_desc
end
json.likes_count @comment.comment_likes.count
json.comments_count @comment.get_replies.count
if (current_user)
  json.liked @comment.liked?(current_user.id)
  json.following_author @comment.following_author?(current_user.id)
else
  json.liked false
  json.following_author false
end

json.replies @comment.replies.includes(:user, :story) do |reply|
  json.id reply.id
  json.story_id reply.story.id
  json.user_id reply.user_id
  json.user_image_url reply.user.photo.url
  json.username reply.user.username
  json.user_fullname reply.user.fullname
  json.published_date reply.published_date
  json.content reply.content
  json.likes_count reply.comment_likes.count
  json.comments_count reply.get_replies.count
  if (current_user)
    json.liked reply.liked?(current_user.id)
  else
    json.liked false
  end
end