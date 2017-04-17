json.array! @tags.each do |tag|
  json.tag_desc tag.tag_desc
end