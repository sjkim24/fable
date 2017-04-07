class CreateTagFollows < ActiveRecord::Migration
  def change
    create_table :tag_follows do |t|
      t.integer :user_id, null: false
      t.integer :tag_id, null: false
      
      t.timestamps null: false
    end
    
    add_index :tag_follows, [:user_id, :tag_id], unique: true
  end
end
