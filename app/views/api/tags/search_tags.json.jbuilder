json.array! @tags.each do |tag|
  json.id tag.id
  json.tag_desc tag.tag_desc.split(" ").map { |el| el.capitalize }.join(" ")
  json.tag_count tag.follow_count
end