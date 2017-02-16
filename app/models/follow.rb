class Follow < ActiveRecord::Base
  validates :follower_id, :following_id, presence: true
  validates_uniqueness_of :follower_id, scope: :following_id
  
  belongs_to :follower,
    class_name: "User",
    foreign_key: :follower_id
    
  belongs_to :following,
    class_name: "User",
    foreign_key: :following_id
end