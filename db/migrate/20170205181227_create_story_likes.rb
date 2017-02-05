class CreateStoryLikes < ActiveRecord::Migration
  def change
    create_table :story_likes do |t|
      t.integer :user_id, null: false
      t.integer :story_id, null: false

      t.timestamps null: false
    end

    add_index :story_likes, [:user_id, :story_id], unique: true
  end
end
