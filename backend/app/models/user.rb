class User < ApplicationRecord

  mount_uploader :image, ImageUploader

  validates :name, {presence: true}
  validates :wallet_address, {presence: true, uniqueness: true}

end
