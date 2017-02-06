class CommentLike < ActiveRecord::Base
  validates :user_id, :comment_id, presence: true
  validates_uniqueness_of :user_id, scope: :comment_id
  
  belongs_to :comment
  belongs_to :user
  
  # include Like
end