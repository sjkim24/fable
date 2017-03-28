class Story < ActiveRecord::Base
  validates :title, :content, presence: true
  validates :title, :subtitle, length: { maximum: 200 }
  
  has_attached_file :banner_image
  validates_attachment :banner_image, content_type: { content_type: ["image/jpg", "image/jpeg", "image/png"] }
  
  belongs_to :user
  
  has_many :comments
  has_many :story_likes, dependent: :destroy
  has_many :bookmarks, dependent: :destroy
  has_many :taggings
  has_many :tags, through: :taggings, source: :tag
  
  # refactor these into a module
  # Comment model also has the exact same funcitons

  # checks if the story has been liked by the current user
  def liked?(user_id)
   !StoryLike.where(story_id: self.id, user_id: user_id).empty?
  end
  
  # returns id of like object made with curernt story.id and current_user.id
  # def like_id(story_id, user_id)
  #   StoryLike.where(story_id: story_id, user_id: user_id)[0].id
  # end
  
  def bookmarked?(user_id)
    !Bookmark.where(story_id: self.id, user_id: user_id).empty?
  end
  
  def has_image?
    !self.banner_image_file_name.nil?
  end
  
  # gets story's comments only; no replies to the story's comments
  def get_comments_only
    self.comments.includes(:user).where(parent_comment_id: nil)
  end
  
  # get story's replies to comments only
  def get_replies_only
    self.comments.includes(:user).where.not(parent_comment_id: nil)
  end
  
  def published_date
    date_hash = {
      "1" => "Jan",
      "2" => "Feb",
      "3" => "Mar",
      "4" => "Apr",
      "5" => "May",
      "6" => "Jun",
      "7" => "Jul",
      "8" => "Aug",
      "9" => "Sep",
      "10" => "Oct",
      "11" => "Nov",
      "12" => "Dec"
    }
    
    month = date_hash[self.created_at.month.to_s]
    day = self.created_at.day.to_s
    
    return month + " " + day
  end
  
  # this function needs fix/refactoring once i figure out how i'm going
  # to structure my content format between rails and react
  def read_time
    (self.content.split(" ").count.to_f / 275).round
  end
  
  def main_tag
    self.tags.first.nil? ? nil : self.tags.first.tag_desc
  end
  
  def following_author?(follower_id)
    follow = Follow.where(follower_id: follower_id, following_id: self.user.id)[0]
    return follow.nil? ? false : true
  end
end