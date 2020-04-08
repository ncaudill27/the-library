class UserSerializer < BaseSerializer
  attributes :name, :username, :email, :bio
  has_many :club_users
  has_many :clubs
  has_many :comments
end
