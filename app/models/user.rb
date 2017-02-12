class User < ActiveRecord::Base
  validates :email, :encrypted_password, :sign_in_count, presence: true

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
end