class User < ActiveRecord::Base
  validates :username, :email, :encrypted_password, :sign_in_count, presence: true

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         #, :trackable, :validatablegmail

  has_many :stories
  has_many :comments
end
