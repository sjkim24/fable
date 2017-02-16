class Story < ActiveRecord::Base
  validates :title, :content, presence: true
  
  has_attached_file :banner_image
  validates_attachment :banner_image, content_type: { content_type: ["image/jpg", "image/jpeg", "image/png"] }
  
  belongs_to :user
  
  has_many :comments
  has_many :story_likes, dependent: :destroy
  has_many :bookmarks, dependent: :destroy
  has_many :taggings
  has_many :tags, through: :taggings, source: :tag
  
  # refactor these into a module
  # Comment model also has the exact same funcitons
  
  # gets story's comments only, no replies to story's comments
  def get_comments_only
    self.comments.where(parent_comment_id: nil)
  end
  
  # checks if the story has been liked by current user
  def liked?(story_id, user_id)
   !StoryLike.where(story_id: story_id, user_id: user_id).empty?
  end
  
  # returns id of like object made with curernt story.id and current_user.id
  def like_id(story_id, user_id)
    StoryLike.where(story_id: story_id, user_id: user_id)[0].id
  end
  
  def bookmarked?(story_id, user_id)
    !Bookmark.where(story_id: story_id, user_id: user_id).empty?
  end
end