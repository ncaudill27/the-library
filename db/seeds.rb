User.destroy_all
Club.destroy_all

def n
  Faker::Number.number(digits: 1)
end

def isbn_13
  "9780545010221"
end

10.times do
  User.create do |u|
    u.name = Faker::Cannabis.strain
    u.username = Faker::Internet.username(specifier: u.name)
    u.email = Faker::Internet.email
    u.password = "password"
    u.bio = Faker::Lorem.sentence(word_count: 10)
    u.avatar = Faker::Avatar.image
    u.favorite_book_isbn13 = isbn_13
  end
end

10.times do
  Club.create do |c|
    c.name = Faker::Hipster.words(number: 1 + rand(3)).join(' ').capitalize
    c.description = Faker::Hipster.sentences(number: 2).join(' ')
    c.avatar = Faker::Avatar.image
    c.active_book_isbn13 = isbn_13
  end
end

Club.all.each do |c|
  c.users << User.all.sample
  3.times do
    Membership.create(user_id: User.all.sample.id, club_id: c.id, mod: false)
    b = Board.create(title: Faker::Book.title)
    c.boards << b
  end

  c.boards.each do |board|
    10.times do
      Comment.create(user: User.all.sample, board: board, content: Faker::ChuckNorris.fact)
    end
  end
end




