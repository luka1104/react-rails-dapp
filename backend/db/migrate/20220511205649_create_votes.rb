class CreateVotes < ActiveRecord::Migration[6.1]
  def change
    create_table :votes do |t|
      t.integer :item_id
      t.integer :user_id

      t.timestamps
    end
  end
end
