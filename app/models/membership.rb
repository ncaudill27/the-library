class Membership < ApplicationRecord
  belongs_to :club
  belongs_to :user

  scope :modding, ->(user_id) { where("mod = true and user_id = ?", user_id) }
end
