class Bookmark < ActiveRecord::Base
  validates :user_id, :story_id, presence: true
  validates_uniqueness_of :user_id, scope: :story_id
  
  belongs_to :user
  belongs_to :story
end