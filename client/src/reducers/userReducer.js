const initialState = {
  data: [],
  pending: false
}

const usersReducer = (state = initialState, action) => {
  let user, users
  switch(action.type) {

    case "BEGIN_USERS_REQUEST":
      return {
        ...state,
        data: [...state.data],
        pending: true
      }

    case "ADD_USERS":
      users = action.users.data.map(user=> {
        return {
          id: user.id,
          name: user.attributes.name,
          username: user.attributes.username,
          email: user.attributes.email,
          bio: user.attributes.bio,
          avatar: user.attributes.avatar,
          currentFavorite: user.attributes.favorite_book_isbn13,
          clubIds: user.relationships.clubs.data.map(club => club.id),
          commentIds: user.relationships.comments.data.map(comment => comment.id),
        };
      });
      return {
        ...state,
        data: state.data.concat(users),
        pending: false
      };

    case "ADD_CLUB":
      console.log(action);
      
      // user = state.data.find(u => u.id === action.userId);
      // user.clubIds.concat(action.clubId)
      // users = state.data.map(u => u.id !== user.id ? u : user);
      // return {...state, data: users}

      case "LOGIN_USER":
        return state;
        
    
    default:
      return state;
  };
};

export default usersReducer;