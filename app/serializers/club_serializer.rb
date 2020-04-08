class ClubSerializer < BaseSerializer
  attributes :name, :description

  has_many :users
  has_many :club_users
  has_many :boards
end
