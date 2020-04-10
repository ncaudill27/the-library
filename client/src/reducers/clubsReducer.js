const clubsReducer = (state = [], action) => {
  console.log(action)
  switch(action.type) {
    case "BEGIN_CLUBS_REQUEST":
      return {
        ...state,
        pending: true
      };

    case "ADD_CLUBS":
      const clubs = action.clubs.map(club => {
        return {
          id: club.id,
          name: club.attributes.name,
          description: club.attributes.description,
          memberIds: club.relationships.users.data.map(user => user.id),
          threadIds: club.relationships.boards.data.map(board => board.id)
        }
      });
      return {
        ...state.concat(clubs),
        pending: false
      }

    default:
      return state;
  }
}