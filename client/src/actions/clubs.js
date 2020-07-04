import { addClub } from './users';
import { flashMessage } from './messages';

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

const postClub = (payload) => {
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
    fetch('/api/v1/clubs', requestObj)
    .then(res => res.json())
    .then( async response => {
      console.log(response);
      if (response.errors) return dispatch(flashMessage(response.errors));
      await dispatch(createClub(response.club));

      dispatch(addClub(response.membership));
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
    .then( async response => {
      if (response.errors) return console.log(response.errors);
      dispatch(addClubMember(response.clubId, response.userId));
    });
  };
};

const addClubMember = (clubId, userId) => ({
  type: "ADD_CLUB_MEMBER",
  clubId,
  userId
});

const removeClubMember = ({clubId, userId}) => ({
  type: "REMOVE_CLUB_MEMBER",
  clubId,
  userId
});

export { fetchClubs, postClub, memberJoinRequest, removeClubMember };