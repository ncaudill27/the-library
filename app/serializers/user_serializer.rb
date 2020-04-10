class UserSerializer < BaseSerializer
  attributes :name, :username, :email, :bio, :avatar, :favorite_book_isbn13
  has_many :club_users
  has_many :clubs
  has_many :comments
end
