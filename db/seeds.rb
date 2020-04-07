User.destroy_all
Club.destroy_all

User.create(name:'Marty McFly', username:'McFly', email:'marty@future.com', password:'password', bio:'Hey, my name is Marty McFly and I enjoy traveling, skateboarding, and adventuring.')
Club.create(name:'Sports \'R Us', description:'We talk about sports books')