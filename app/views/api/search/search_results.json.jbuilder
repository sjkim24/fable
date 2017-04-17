json.stories do
  json.partial! partial: "api/stories/index", stories: @stories
end

json.users do
  json.array! @users.each do |user|
    json.id user.id
    json.fullname user.fullname
    json.desc user.user_desc
    json.image_url user.photo.url
    if current_user
      json.following current_user.following?(current_user.id, user.id)
    else
      json.following false
    end
  end
end

json.tags do
  json.array! @tags.each do |tag|
    json.tag_desc tag.content.capitalize
  end
end

