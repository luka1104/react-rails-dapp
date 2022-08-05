class ChangeUserColumns < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :wallet_address, :integer
    add_column :users, :wallet_address, :string
  end
end
