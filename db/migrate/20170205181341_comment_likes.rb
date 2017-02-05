class CommentLikes < ActiveRecord::Migration
  def change
    create_table :comment_likes do |t|
      t.integer :user_id, null: false
      t.integer :comment_id, null: false

      t.timestamps null: false
    end

    add_index :comment_likes, [:user_id, :comment_id], unique: true
  end
end
