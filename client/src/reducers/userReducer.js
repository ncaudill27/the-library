const initialState = {
  data: [],
  currentUser: false,
  pending: false
}

const usersReducer = (state = initialState, action) => {
  let user, users
  switch(action.type) {

    case "BEGIN_USERS_REQUEST":
      return {...state, data: [...state.data], pending: true};

    case "ADD_USERS":
      users = action.users.data.map(user=> {
        return {
          id: user.id,
          name: user.attributes.name,
          username: user.attributes.username,
          email: user.attributes.email,
          bio: user.attributes.bio,
          avatar: user.attributes.avatar,
          currentlyReading: !!user.attributes.favoriteBookIsbn13 ? user.attributes.favoriteBookIsbn13.replace(/-/g, '') : null,
          clubIds: user.relationships.clubs.data.map(club => club.id),
          commentIds: user.relationships.comments.data.map(comment => comment.id),
        };
      });

      return {...state, data: state.data.concat(users), pending: false};

    case "ADD_CLUB":    
      user = state.data.find(u => u.id === action.userId);
      user.clubIds = user.clubIds.concat(action.clubId)
      users = state.data.map(u => u.id !== user.id ? u : user);

      return {...state, data: users, currentUser: user, pending: false}

    case "LOGIN_USER":
      const {
        id,
        attributes: {
          name, username, email, bio, avatar, favoriteBookIsbn13
        },
        relationships: {
          clubs: {
            data: clubs
          },
          comments: {
            data: comments
          }
        }
      } = action.userData; 

      const currentUser =  {
        id: id,
        name: name,
        username: username,
        email: email,
        bio: bio,
        avatar: avatar,
        currentlyReading: !!favoriteBookIsbn13 ? favoriteBookIsbn13.replace(/-/g, '') : null,
        clubIds: clubs.map(club => club.id),
        commentIds: comments.map(comment => comment.id),
      };
      return {...state, currentUser: currentUser, pending: false}

    case "LEAVE_CLUB":
      user = state.currentUser
      let updatedClubs = user.clubIds.filter(id => id !== action.clubId);
      let updatedUser = {...user, clubIds: updatedClubs};
      
      return {...state, currentUser: updatedUser, pending: false};
      
    case "LOGOUT_USER":
      localStorage.clear();
      return {...state, currentUser: false, pending: false};

    default:
      return state;
  };
};

export default usersReducer;