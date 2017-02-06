class Comment < ActiveRecord::Base
  validates :content, :user_id, :story_id, presence: true

  belongs_to :user
  belongs_to :story

  has_many :replies, class_name: "Comment",
                     foreign_key: "parent_comment_id",
                     dependent: :destroy
                     
  # gets comment's replies only
  def get_replies
    self.replies.order("created_at ASC")
  end                   
                     
  # refactor these into a module
  # Comment model also has the exact same funcitons
  
  # checks if the comment has been liked by current user
  def liked?(comment_id, user_id)
   !CommentLike.where(comment_id: comment_id, user_id: user_id).empty?
  end
  
  # returns id of like object made with curernt comment.id and current_user.id
  def like_id(comment_id, user_id)
    CommentLike.where(comment_id: comment_id, user_id: user_id)[0].id
  end
end