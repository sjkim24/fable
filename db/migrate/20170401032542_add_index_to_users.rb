class AddIndexToUsers < ActiveRecord::Migration
  def change
    change_column :users, :username, :string, null: false
    add_index :users, :username, :unique => true
  end
end
