class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.integer :wallet_address, null: false
      t.string :email

      t.timestamps
    end
  end
end
