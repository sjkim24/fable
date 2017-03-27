json.array! @comments.each do |comment|
  json.id comment.id
  json.story_id comment.story.id
  json.user_id comment.user_id
  json.user_image_url comment.user.photo.url
  json.username comment.user.username
  json.user_fullname comment.user.fullname
  json.published_date comment.published_date
  json.content comment.content
  json.likes_count comment.comment_likes.count
  json.comments_count comment.get_replies.count
  if (current_user)
    json.liked comment.liked?(current_user.id)
  else
    json.liked false
  end
end