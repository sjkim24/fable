json.id current_user.id
json.username current_user.username
json.fullname current_user.fullname
json.user_desc current_user.user_desc
json.user_image_url current_user.photo.url.gsub(/^http/, "https")
json.tag_follows current_user.tag_follows.includes(:tag).each do |tag_follow|
  json.tag_desc tag_follow.tag.tag_desc
end