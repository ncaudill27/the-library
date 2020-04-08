class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :username, :email, :bio
  has_many :club_users
  has_many :clubs
end
