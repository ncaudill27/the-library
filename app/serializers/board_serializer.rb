class BoardSerializer < BaseSerializer
  attributes :title

  # belongs_to :creator
  belongs_to :club
  # has_many :users
  has_many :comments
end
