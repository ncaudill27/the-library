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
          id: user.id,
          name: user.attributes.name,
          username: user.attributes.username,
          email: user.attributes.email,
          bio: user.attributes.bio,
          clubIds: user.relationships.clubs.data.map(club => club.id),
          commentIds: user.relationships.comments.data.map(comment => comment.id),
        };
      });
      return {
        ...state,
        data: state.data.concat(users),
        pending: false
      };
    
    default:
      return state;
  };
};

export default usersReducer;