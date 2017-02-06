class StoryLike < ActiveRecord::Base
  extend Like
  
  validates :user_id, :story_id, presence: true
  validates_uniqueness_of :user_id, scope: :story_id
  
  belongs_to :story
  belongs_to :user
end