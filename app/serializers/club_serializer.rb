class ClubSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description
end
