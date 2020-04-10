User.destroy_all
Club.destroy_all

def n
  Faker::Number.number(digits: 1)
end

def isbn_13
  "978-0-7660-#{n}#{n}#{n}#{n}-#{n}"
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
    c.description = Faker::Hipster.sentences(number: 2).join('. ')
    c.avatar = Faker::Avatar.image
    c.active_book_isbn13 = isbn_13
  end
end

Club.all.each do |c|
  3.times do
    b = Board.create(title: Faker::Movies::Lebowski.quote)
    c.users << User.all.sample
    c.boards << b
  end

  c.boards.each do |board|
    10.times do
      Comment.create(user: User.all.sample, board: board, content: Faker::ChuckNorris.fact)
    end
  end
end




