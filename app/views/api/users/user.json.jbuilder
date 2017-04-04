json.id @user.id
json.fullname @user.fullname
json.desc @user.user_desc
json.image_url @user.photo.url
json.following @user.following?(current_user.id, @user.id)