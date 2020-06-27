class User < ApplicationRecord
  has_many :memberships, dependent: :destroy
  has_many :clubs, through: :memberships
  has_many :comments, dependent: :destroy
  has_many :boards, through: :comments
  
  has_secure_password

  scope :is_mod, ->(user_id) { joins(:memberships).merge(Membership.mod).where("user_id = ?", user_id) }

  def mod_for
    Membership.modding(self.id).map{ |m| m.club_id.to_s }.uniq
  end
end
