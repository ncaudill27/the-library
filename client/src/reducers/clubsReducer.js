const initialState = {
  data: [],
  pending: false 
}

const clubsReducer = (state = initialState, action) => {
  let club, clubs, updatedMembers, updatedClub, updatedClubs

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
          activeBook: "9780545010221",
          memberIds: club.relationships.users.data.map(user => user.id),
          threadIds: club.relationships.boards.data.map(board => board.id),
        };
      });

      return {...state, data: state.data.concat(clubs), pending: false};

    case "CREATE_CLUB":
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
        memberIds: users.map(user => user.id),
        threadIds: []
      }

      return {...state, data: state.data.concat(club), pending: false};

    case "ADD_CLUB_MEMBER":
      club = state.data.find(c => c.id === action.clubId);
      updatedMembers = club.memberIds.concat(action.userId);
      updatedClub = {...club, memberIds: updatedMembers};
      updatedClubs = state.data.map(c => c.id !== club.id ? c : updatedClub);
      
      return {...state, data: updatedClubs, pending: false};
      
    case "REMOVE_CLUB_MEMBER":
      club = state.data.find(c => c.id === action.clubId);
      updatedMembers = club.memberIds.filter(id => id !== action.userId);
      updatedClub = {...club, memberIds: updatedMembers};
      updatedClubs = state.data.map(c => c.id !== club.id ? c : updatedClub);
      return {...state, data: updatedClubs, pending: false};

    default:
      return state;
  };
};

export default clubsReducer;