class Comment < ApplicationRecord
  belongs_to :board
  belongs_to :user, through: :board
  belongs_to :club, through: :board
end
