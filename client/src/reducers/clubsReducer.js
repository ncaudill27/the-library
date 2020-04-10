const initialState = {
  data: [],
  pending: false 
}

const clubsReducer = (state = initialState, action) => {
  switch(action.type) {

    case "BEGIN_CLUBS_REQUEST":
      return {
        ...state,
        data: [...state.data],
        pending: true
      };

    case "ADD_CLUBS":
      const clubs = action.clubs.data.map(club => {
        return {
          id: parseInt(club.id, 10),
          name: club.attributes.name,
          description: club.attributes.description,
          avatar: club.attributes.avatar,
          memberIds: club.relationships.users.data.map(user => parseInt(user.id, 10)),
          threadIds: club.relationships.boards.data.map(board => parseInt(board.id)),
        };
      });
      return {
        ...state,
        data: state.data.concat(clubs),
        pending: false
      };

    default:
      return state;
  };
};

export default clubsReducer;