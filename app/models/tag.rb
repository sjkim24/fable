class Tag < ActiveRecord::Base
  validates :tag_desc, presence: true
  
  belongs_to :tagging
  
  has_many :stories, through: :tagging, source: :story
  has_many :tag_follows
end