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
      console.log(action);
      let {
        id,
        attributes: {
          name, description
        },
        relationships: {
          users: { data: users}
        }
      } = action.club.data
      
      club = {
        id,
        name,
        description,
        memberIds: users.map(user => user.id)
      }

      return {...state, data: state.data.concat(club), pending: false};

    default:
      return state;
  };
};

export default clubsReducer;