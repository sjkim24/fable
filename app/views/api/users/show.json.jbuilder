json.id @user.id
json.fullname @user.fullname
json.desc @user.user_desc
json.image_url @user.photo.url

json.followers @user.followers.each do |follower|
  json.follower_id follower.id
  json.follower_fullname follower.fullname
  json.follower_desc follower.user_desc
  json.follower_image_url follower.photo.url
end

json.followings @user.followings.each do |following|
  json.following_id following.id
  json.follower_fullname following.fullname
  json.following_desc following.user_desc
  json.following_image_url following.photo.url
end

json.latest @latest.each do |story|
  json.id story.id
  json.user_id story.user.id
  json.username story.user.username
  json.user_fullname story.user.fullname
  json.user_desc story.user.user_desc
  json.user_image_url story.user.photo.url
  json.published_date story.published_date
  json.read_time story.read_time
  json.title story.title
  json.subtitle story.subtitle
  if story.has_image?
    json.image_url story.banner_image.url
  else
    json.image_url nil
  end
  json.content story.content
  json.likes_count story.story_likes.count
  json.comments_count story.get_comments_only.count
  json.main_tag story.main_tag
  if (current_user)
    json.liked story.liked?(current_user.id)
    json.bookmarked story.bookmarked?(current_user.id)
    json.following_author story.following_author?(current_user.id)
  else
    json.liked false
    json.bookmarked false
    json.following_author false
  end
end

json.recommends @recommends.each do |recommend|
  json.rec_story_id recommend.id
  json.rec_story_title recommend.title
  json.rec_author_fullname recommend.user.fullname
  json.rec_author_username recommend.user.username
  if recommend.has_image?
    json.image_url recommend.banner_image.url
  else
    json.image_url nil
  end
end