class Club < ApplicationRecord
  has_many :club_users, dependent: :destroy
  has_many :users, through: :club_users
  has_many :boards, dependent: :destroy
end
