class User < ApplicationRecord
  has_many :memberships, dependent: :destroy
  has_many :clubs, through: :memberships
  has_many :comments, dependent: :destroy
  has_many :boards, through: :comments
  
  has_secure_password

  def mod_for
    Membership.modding(self.id).map do |m|
      {
        'clubId': m.club_id.to_s,
        'membershipId': m.id.to_s
      }
    end
  end
end
