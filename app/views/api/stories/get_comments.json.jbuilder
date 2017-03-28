json.array! @comments.each do |comment|
  json.id comment.id
  json.story_id comment.story.id
  json.story_title comment.story.title
  json.story_author comment.story.user.fullname
  json.story_likes_count comment.story.story_likes.count
  json.story_comments_count comment.story.comments.count
  json.user_id comment.user_id
  json.user_image_url comment.user.photo.url
  json.username comment.user.username
  json.user_fullname comment.user.fullname
  json.user_desc comment.user.user_desc
  json.published_date comment.published_date
  json.content comment.content
  json.tags comment.story.tags do |tag|
    json.tag_desc tag.tag_desc
  end
  json.likes_count comment.comment_likes.count
  json.comments_count comment.get_replies.count
  if (current_user)
    json.liked comment.liked?(current_user.id)
  else
    json.liked false
  end
end