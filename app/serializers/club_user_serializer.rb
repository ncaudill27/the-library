class ClubUserSerializer < BaseSerializer
  attributes :mod
  
  belongs_to :club
  belongs_to :user
end
