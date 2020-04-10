class CommentSerializer < BaseSerializer
  attributes :content

  belongs_to :board
  belongs_to :user
end