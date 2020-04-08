User.destroy_all
Club.destroy_all

marty = User.create(name:'Marty McFly', username:'McFly', email:'marty@future.com', password:'password', bio:'Hey, my name is Marty McFly and I enjoy traveling, skateboarding, and adventuring.')
margot = User.create(name:'Margo the Destroyer', username:'Bambi', email:'margo@magic.com', password:'password')

sporty = Club.create(name:'Sports \'R Us', description:'We talk about sports books')
battle = Club.create(name:'Ready', description:'We talk about battle magic books')

b = Board.create(club_id:sporty.id, title:'Whoa')
b2 = Board.create(club_id:battle.id, title:'Dude')

b << [marty, margo]
b2 << margo

Comment.create(board_id:b.id, user_id: margo.id, content:'OMG if this comment lands!')
Comment.create(board_id:b2.id, user_id: margo.id, content:'I swear to shit!')

