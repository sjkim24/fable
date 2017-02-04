class Comment < ActiveRecord::Base
  validates :content, :user_id, :story_id, presence: true

  belongs_to :user
  belongs_to :story

  has_many :replies, class_name: "Comment",
                     foreign_key: "parent_comment_id"
end
