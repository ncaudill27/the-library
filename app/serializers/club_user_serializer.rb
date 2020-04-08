class ClubUserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :mod
  
  belongs_to :club
  belongs_to :user
end
