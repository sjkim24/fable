class DeviseCreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email null: false
      t.string :user_name null: false
      t.text :user_desc
      t.string :password_digest null: false
      t.string :session_token null: false

      t.timestamps null: false
    end

    add_index :users, :email,                unique: true
    add_index :users, :user_name,             unique: true
  end
end
