json.array! @comments.each do |comment|
  json.id comment.id
  json.story_title comment.get_story_title
  json.content comment.content.to_json
  json.published_date comment.published_date
end