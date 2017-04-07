class TagFollow < ActiveRecord::Base
  validates :user_id, :tag_id, presence: true
  validates_uniqueness_of :user_id, scope: :tag_id
  
  belongs_to :user
  belongs_to :tag
end