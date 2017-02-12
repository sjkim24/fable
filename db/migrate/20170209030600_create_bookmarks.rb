class CreateBookmarks < ActiveRecord::Migration
  def change
    create_table :bookmarks do |t|
      t.integer :user_id, null: false
      t.integer :story_id, null: false
      
      t.timestamps null:false
    end
    
    add_index :bookmarks, [:user_id, :story_id], unique: true
  end
end
