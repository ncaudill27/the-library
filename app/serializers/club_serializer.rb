class ClubSerializer < BaseSerializer
  attributes :name, :description, :avatar, :active_book_isbn13

  has_many :users
  has_many :memberships
  has_many :boards
end
