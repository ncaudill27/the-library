const initialState = {
  data: [],
  memberships: [],
  currentUser: false,
  pending: false
}

const usersReducer = (state = initialState, action) => {

  let user, users, memberships

  switch(action.type) {

    case "BEGIN_USERS_REQUEST":
      return {...state, data: [...state.data], pending: true};

    case "ADD_USERS":

      memberships = action.memberships.map( membership => {
        return {
          id: membership.id,
          clubId: membership.attributes.clubId.toString(),
          userId: membership.attributes.userId.toString(),
          isMod: membership.attributes.mod
        };
      });
      console.log(memberships);

      users = action.users.map( user => {
        return {
          id: user.id,
          name: user.attributes.name,
          username: user.attributes.username,
          email: user.attributes.email,
          bio: user.attributes.bio,
          avatar: user.attributes.avatar,
          currentlyReading: !!user.attributes.favoriteBookIsbn13 ? user.attributes.favoriteBookIsbn13.replace(/-/g, '') : null,
          commentIds: user.relationships.comments.data.map( comment => comment.id ),
          memberships: memberships.filter( membership => membership.userId === user.id )
        };
      });
      console.log(users);
      

      return {...state, data: state.data.concat(users), memberships: state.memberships.concat(memberships), pending: false};

    case "ADD_CLUB":    
      console.log(action);
    
      user = state.data.find(u => u.id === action.userId);
      user.clubIds = user.clubIds.concat(action.clubId);
      console.log(action.membership);
      user.modInfo = user.modInfo.concat(action.membership);
      users = state.data.map( u => u.id !== user.id ? u : user );

      return {...state, data: users, currentUser: user, pending: false}

    case "LOGIN_USER":
      const {
        id,
        attributes: {
          name, username, email, bio, avatar, favoriteBookIsbn13, modFor
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
        modInfo: modFor.map( id => id )
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