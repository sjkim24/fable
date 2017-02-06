class Story < ActiveRecord::Base
  validates :title, :content, presence: true

  belongs_to :user
  
  has_many :comments, dependent: :destroy
  has_many :likes, class_name: "StoryLike", foreign_key: :story_id, dependent: :destroy
  
  # refactor these into a module
  # Comment model also has the exact same funcitons
  
  # checks if the story has been liked by current user
  def liked?(story_id, user_id)
   !StoryLike.where(story_id: story_id, user_id: user_id).empty?
  end
  
  # returns id of like object made with curernt story.id and current_user.id
  def like_id(story_id, user_id)
    StoryLike.where(story_id: story_id, user_id: user_id)[0].id
  end
end