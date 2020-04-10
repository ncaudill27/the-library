const clubsReducer = (state = { data: [], pending: false }, action) => {
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
          id: club.id,
          name: club.attributes.name,
          description: club.attributes.description,
          memberIds: club.relationships.users.data.map(user => user.id),
          threadIds: club.relationships.boards.data.map(board => board.id)
        }
      });
      return {
        ...state,
        data: state.data.concat(clubs),
        pending: false
      };

    default:
      return state;
  }
}

export default clubsReducer;