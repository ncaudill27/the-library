class User < ApplicationRecord
  has_many :club_users
  has_many :clubs, through: :club_users
  has_many :boards
  has_many :comments, through: :boards
  
  has_secure_password
end
