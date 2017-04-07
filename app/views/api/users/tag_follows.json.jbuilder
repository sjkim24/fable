json.array! @tag_follows.each do |tag_follow|
  json.id tag_follow.id
  json.user_id tag_follow.user_id
  json.tag_id tag_follow.tag_id
  json.tag_desc tag_follow.tag.tag_desc
end