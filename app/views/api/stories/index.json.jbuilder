json.stories do
  json.partial! partial: "api/stories/index", stories: @stories
end

json.top_liked_stories do
  json.array! @top_liked_stories.each do |story|
    json.id story.id
    json.title story.title
    json.user_id story.user.id
    json.user_fullname story.user.fullname
    json.username story.user.username
    json.user_image_url story.user.photo.url.gsub(/^http/, "https")
  end
end

json.top_bookmarked_stories do
  json.array! @top_bookmarked_stories.each do |story|
    json.id story.id
    json.title story.title
    json.user_id story.user.id
    json.user_fullname story.user.fullname
    json.username story.user.username
    json.user_image_url story.user.photo.url.gsub(/^http/, "https")
  end
end