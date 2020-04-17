import { addClub } from './users';

const begin = func => func({type: "BEGIN_CLUBS_REQUEST"});
const token = localStorage.getItem('token');

const fetchClubs = () => {
  return (dispatch) => {
    begin(dispatch);
    fetch('/api/v1/clubs')
    .then(res => res.json())
    .then(json => dispatch(addClubs(json)));
  };
};

const addClubs = clubsJSON => ({
  type: "ADD_CLUBS",
  clubs: clubsJSON
});

const postClub = (payload, currentUserId) => {
  const requestObj = {
    'method': 'POST',
    'headers': {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    'body': JSON.stringify(payload)
  }

  return dispatch => {
    begin(dispatch);
    fetch('/api/v1/clubs', requestObj)
    .then(res => res.json())
    .then( async response => {
      if (response.errors) return console.log(response.errors);
      let post = await dispatch(createClub(response.club));      
      dispatch(addClub(post.club.data.id, currentUserId));
    });
  };
};

const createClub = clubJSON => ({
  type: "CREATE_CLUB",
  club: clubJSON
});

const memberJoinRequest = payload => {
  const requestObj = {
    'method': 'POST',
    'headers': {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    'body': JSON.stringify(payload)
  };

  return dispatch => {
    begin(dispatch);
    fetch(`/api/v1/memberships`, requestObj)
    .then(res => res.json())
    .then( response => {
      debugger
      if (response.errors) return console.log(response.errors);
      dispatch(addClubMember(response.data))
    });
  };
};

const addClubMember = club => ({
  type: "ADD_CLUB_MEMBER",
  club
});

export { fetchClubs, postClub, memberJoinRequest };