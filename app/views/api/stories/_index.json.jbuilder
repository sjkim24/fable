json.array! @stories do |story|
  json.id story.id
  json.user_id story.user.id
  json.username story.user.username
  json.user_fullname story.user.fullname
  json.user_desc story.user.user_desc
  json.user_image_url story.user.photo.url.gsub(/^http/, "https")
  json.published_date story.published_date
  json.read_time story.read_time
  json.title story.title
  json.subtitle story.subtitle
  if story.has_image?
    json.image_url story.banner_image.url.gsub(/^http/, "https")
  else
    json.image_url nil
  end
  json.content story.content.to_json
  json.likes_count story.story_likes.count
  json.comments_count story.get_comments_only.count
  json.main_tag story.main_tag
  if (current_user)
    json.liked story.liked?(current_user.id)
    json.bookmarked story.bookmarked?(current_user.id)
    json.following_author story.following_author?(current_user.id)
  else
    json.liked false
    json.bookmarked false
    json.following_author false
  end
  json.tags story.tags do |tag|
    json.tag_desc tag.tag_desc
  end
end 
