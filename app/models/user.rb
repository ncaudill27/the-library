class User < ApplicationRecord
  has_many :club_users
  has_many :clubs, through: :club_users
  has_many :user_boards
  has_many :boards, through: :user_boards
  has_many :comments, through: :boards
  
  has_secure_password
end
