class Story < ActiveRecord::Base
  validates :title, :content, presence: true

  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :likes, class_name: "StoryLike", foreign_key: :story_id, dependent: :destroy
end