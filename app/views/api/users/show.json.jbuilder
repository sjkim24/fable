json.id @user.id
json.fullname @user.fullname
json.desc @user.user_desc
json.image_url @user.photo.url

json.followers @user.followers.each do |follower|
  json.id follower.id
  json.fullname follower.fullname
  json.desc follower.user_desc
  json.image_url follower.photo.url
end

json.followings @user.followings.each do |following|
  json.id following.id
  json.fullname following.fullname
  json.desc following.user_desc
  json.image_url following.photo.url
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

json.recommends @recommends.includes(:user).each do |recommend|
  json.story_id recommend.id
  json.story_title recommend.title
  json.author_fullname recommend.user.fullname
  json.author_username recommend.user.username
  if recommend.has_image?
    json.image_url recommend.banner_image.url
  else
    json.image_url nil
  end
end

json.comments @comments.each do |comment|
  json.id comment.id
  json.story_id comment.story.id
  json.story_title comment.story.title
  json.story_author comment.story.user.fullname
  json.story_likes_count comment.story.story_likes.count
  json.story_comments_count comment.story.get_comments_only.count
  json.user_id comment.user_id
  json.user_image_url comment.user.photo.url
  json.username comment.user.username
  json.user_fullname comment.user.fullname
  json.user_desc comment.user.user_desc
  json.published_date comment.published_date
  json.content comment.content
  json.tags comment.story.tags do |tag|
    json.tag_desc tag.tag_desc
  end
  json.likes_count comment.comment_likes.count
  json.comments_count comment.get_replies.count
  if (current_user)
    json.liked comment.liked?(current_user.id)
    json.following_author comment.following_author?(current_user.id)
  else
    json.liked false
    json.following_author false
  end
end