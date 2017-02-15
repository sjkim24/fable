class User < ActiveRecord::Base
  validates :email, :encrypted_password, :sign_in_count, presence: true
  
  has_attached_file :photo, styles: { thumb: '100x100>', square: '200x200#', medium: '300x300>' }
  validates_attachment :photo, content_type: { content_type: ["image/jpg", "image/jpeg", "image/png"] }
  # Explicitly do not validate
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
  has_many :followings, class_name: "Follow", foreign_key: :follower_id, dependent: :destroy
  has_many :followers, class_name: "Follow", foreign_key: :following_id, dependent: :destroy
end