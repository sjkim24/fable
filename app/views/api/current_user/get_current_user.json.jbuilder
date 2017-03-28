if @current_user
  json.id @current_user.id
  json.user_image_url @current_user.photo.url
else
  json.id nil
end