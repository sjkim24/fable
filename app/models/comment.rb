class Comment < ActiveRecord::Base
  validates :content, :user_id, :story_id, presence: true
  validates :parent_comment_id, presence: true, allow_nil: true

  belongs_to :user
  belongs_to :story

  has_many :replies, class_name: "Comment",
                     foreign_key: "parent_comment_id",
                     dependent: :destroy
  has_many :comment_likes, dependent: :destroy
                     
  # gets comment's replies only
  def get_replies
    self.replies.order("created_at ASC")
  end                   
                     
  # refactor these into a module
  # Comment model also has the exact same funcitons
  
  # checks if the comment has been liked by current user
  def liked?(user_id)
   !CommentLike.where(comment_id: self.id, user_id: user_id).empty?
  end
  
  # returns id of like object made with curernt comment.id and current_user.id
  # def like_id(comment_id, user_id)
  #   CommentLike.where(comment_id: comment_id, user_id: user_id)[0].id
  # end
  
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
  
  def following_author?(follower_id)
    follow = Follow.where(follower_id: follower_id, following_id: self.user.id)[0]
    return follow.nil? ? false : true
  end
end