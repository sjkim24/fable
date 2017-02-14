class AddBannerImageToStories < ActiveRecord::Migration
  def self.up
    add_attachment :stories, :banner_image
  end
end
