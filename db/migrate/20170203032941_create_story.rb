class CreateStory < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.string :title, null: false
      t.string :content, null: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end
  end
end
