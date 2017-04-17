json.array! @replies.includes(:user, :story).each do |reply|
  json.id reply.id
  json.story_id reply.comment.id
  json.story_author reply.comment.user.fullname
  json.story_likes_count reply.comment.comment_likes.count
  json.story_comments_count reply.comment.get_replies.count
  json.user_id reply.user_id
  json.user_image_url reply.user.photo.url.gsub(/^http/, "https")
  json.username reply.user.username
  json.user_fullname reply.user.fullname
  json.user_desc reply.user.user_desc
  json.published_date reply.published_date
  json.content reply.content
  json.tags reply.story.tags do |tag|
    json.tag_desc tag.tag_desc
  end
  json.likes_count reply.comment_likes.count
  json.comments_count reply.get_replies.count
  if (current_user)
    json.liked reply.liked?(current_user.id)
  else
    json.liked false
  end
end