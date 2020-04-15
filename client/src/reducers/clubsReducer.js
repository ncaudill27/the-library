const initialState = {
  data: [],
  pending: false 
}

const clubsReducer = (state = initialState, action) => {
  let club, clubs
  switch(action.type) {

    case "BEGIN_CLUBS_REQUEST":
      return {...state, data: [...state.data], pending: true};

    case "ADD_CLUBS":
      clubs = action.clubs.data.map(club => {
        return {
          id: club.id,
          name: club.attributes.name,
          description: club.attributes.description,
          avatar: club.attributes.avatar,
          memberIds: club.relationships.users.data.map(user => user.id),
          threadIds: club.relationships.boards.data.map(board => board.id),
        };
      });

      return {...state, data: state.data.concat(clubs), pending: false};

    case "CREATE_CLUB":
      const {
        club: {
          data: {
            id,
            name
          },
          attributes: {
            description,
            avatar
          },
          relationships: {
            users: {data: memberIds},
            boards: {data: threadIds}
          }
        }
      } = action;
      
      club = {id, name, description, avatar, memberIds, threadIds};
      return {...state, data: [...state.data, club], pending: false};

    default:
      return state;
  };
};

export default clubsReducer;