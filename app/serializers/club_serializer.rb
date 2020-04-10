class ClubSerializer < BaseSerializer
  attributes :name, :description, :avatar, :active_book_isbn13

  has_many :users
  has_many :club_users
  has_many :boards
end
