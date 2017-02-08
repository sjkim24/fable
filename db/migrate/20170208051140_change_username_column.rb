class ChangeUsernameColumn < ActiveRecord::Migration
  def change
    change_column :users, :username, :string, default: "", null: true
  end
end
