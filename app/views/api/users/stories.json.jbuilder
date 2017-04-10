json.array! @stories.each do |story|
  json.id story.id
  json.title story.title
  json.subtitle story.subtitle
  json.content story.content.to_json
  json.published_date story.published_date
  json.read_time story.read_time
end