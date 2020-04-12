const initialState = {
  data: [],
  pending: false
}

const usersReducer = (state = initialState, action) => {
  switch(action.type) {

    case "BEGIN_USERS_REQUEST":
      return {
        ...state,
        data: [...state.data],
        pending: true
      }

    case "ADD_USERS":
      const users = action.users.data.map(user=> {
        return {
          id: parseInt(user.id, 10),
          name: user.attributes.name,
          username: user.attributes.username,
          email: user.attributes.email,
          bio: user.attributes.bio,
          avatar: user.attributes.avatar,
          currentFavorite: user.attributes.favorite_book_isbn13,
          clubIds: user.relationships.clubs.data.map(club => parseInt(club.id, 10)),
          commentIds: user.relationships.comments.data.map(comment => parseInt(comment.id, 10)),
        };
      });
      return {
        ...state,
        data: state.data.concat(users),
        pending: false
      };

      case "LOGIN_USER":
        console.log(action.user);
        console.log({...state, secret: "newkey"});
        
        return state;
        
    
    default:
      return state;
  };
};

export default usersReducer;