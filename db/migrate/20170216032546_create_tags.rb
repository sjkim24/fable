class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :tag_desc, null: false
      
      t.timestamps null: false
    end
    
    add_index :tags, :tag_desc, unique: true
  end
end
