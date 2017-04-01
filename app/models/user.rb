class User < ActiveRecord::Base
  validates :email, :encrypted_password, :sign_in_count, presence: true
  validates :user_desc, length: { maximum: 160 }
  
  has_attached_file :photo, 
    styles: { thumb: '100x100>', square: '200x200#', medium: '300x300>' },
    :default_url => "/images/user_default.png"
    
  validates_attachment :photo, content_type: { content_type: ["image/jpg", "image/jpeg", "image/png"] }
  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         #, :trackable, :validatablegmail

  has_many :stories, dependent: :destroy
  has_many :comments
  has_many :story_likes, dependent: :destroy
  has_many :comment_likes, dependent: :destroy
  has_many :bookmarks, dependent: :destroy
  
  has_many :recommends, through: :story_likes, source: :story
  
  has_many :follower_relationships, class_name: "Follow", foreign_key: :following_id, dependent: :destroy
  has_many :followers, through: :follower_relationships, source: :follower
  
  has_many :following_relationships, class_name: "Follow", foreign_key: :follower_id, dependent: :destroy
  has_many :followings, through: :following_relationships, source: :following
  
  def following?(current_user_id, user_id)
    Follow.where(follower_id: current_user_id, following_id: user_id).present?
  end
  
  def get_comments_only
    Comment.where(user_id: self.id, parent_comment_id: nil)
  end
  
  def get_recommends
    Story.where()
  end
end