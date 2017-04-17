class Tag < ActiveRecord::Base
  include PgSearch
  pg_search_scope :search_by_tag_desc, against: [:tag_desc]
  multisearchable :against => :tag_desc
  
  validates :tag_desc, presence: true, uniqueness: { case_sensitive: false }
  
  belongs_to :tagging
  
  has_many :stories, through: :tagging, source: :story
  has_many :tag_follows
  
  def follow_count
    TagFollow.where(tag_id: self.id).count
  end
end