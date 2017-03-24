json.array! @stories do |story|
  json.id story.id
  json.user_id story.user.id
  json.username story.user.username
  json.user_image_url story.user.photo.url
  json.published_date story.published_date
  json.read_time story.read_time
  json.title story.title
  json.subtitle story.subtitle
  if story.has_image?
    json.image_url story.banner_image.url
  else
    json.image_url nil
  end
  json.content story.content
  json.likes_count story.story_likes.count
  json.comments_count story.get_comments_only.count
  json.main_tag story.main_tag
  if (current_user)
    json.liked story.liked?(story.id, current_user.id)
    json.bookmarked story.bookmarked?(story.id, current_user.id)
  else
    json.liked false
    json.bookmarked false
  end
end 
