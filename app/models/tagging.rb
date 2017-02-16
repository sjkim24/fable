class Tagging < AcitveRecord::Base
  validates :story_id, :tag_id, presence: true
  validates_uniqueness_of :story_id, scope: :tag_id
  
  belongs_to :tag
  belongs_to :story
end