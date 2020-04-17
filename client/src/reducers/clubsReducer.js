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

    case "ADD_CLUB_MEMBER":
      club = state.data.find(c => c.id === action.club.id);
      let updatedMembers = club.memberIds.concat(action.club.relationships.users.data[0].id);
      let updatedClub = {...club, memberIds: updatedMembers};
      let updatedClubs = state.data.map(c => c.id !== club.id ? c : updatedClub)
      
      return {...state, data: updatedClubs, pending: false};
      
    default:
      return state;
  };
};

export default clubsReducer;