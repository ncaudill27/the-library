class User < ApplicationRecord
  has_many :club_users
  has_many :clubs, through: :club_users

  has_secure_password
end
