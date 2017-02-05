class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :content, null: false
      t.integer :user_id, null: false
      t.integer :story_id, null: false
      t.integer :parent_comment_id, null: true

      t.timestamps null: false
    end
  end
end
