class AddAvatarToUsers < ActiveRecord::Migration
  def self.up
    add_attachment :users, :avatar
  end
end
