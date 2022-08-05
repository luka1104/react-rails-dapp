class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.string :image
      t.integer :price, null: false
      t.string :url
      t.integer :status, default: 0, null: false

      t.timestamps
    end
  end
end
