json.array! @stories do |story|
  json.id story.id
  json.user_id story.user.id
  json.username story.user.username
  json.published_date story.published_date
  json.read_time story.read_time
  json.title story.title
  if story.has_image?
    json.image_url story.banner_image.url
  else
    json.image_url nil
  end
  json.likes_count story.story_likes.count
  json.comments_count story.get_comments_only.count
  json.main_tag story.main_tag
end 
