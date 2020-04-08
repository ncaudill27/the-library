class Board < ApplicationRecord
  belongs_to :club
  # belongs_to :creator, class_name: 'User', foreign_key: 'user_id'
  has_many :user_boards
  has_many :users, through: :user_boards
  has_many :comments
end
