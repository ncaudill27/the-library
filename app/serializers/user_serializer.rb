class UserSerializer < BaseSerializer
  attributes :name, :username, :email, :bio, :avatar, :favorite_book_isbn13, :mod_for
  has_many :memberships
  has_many :clubs
  has_many :comments
end
