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

const postClub = payload => {
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

const patchClub = (payload, clubId) => {
  const requestObj = {
    'method': 'PATCH',
    'headers': {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    'body': JSON.stringify(payload)
  };

  return dispatch => {
    begin(dispatch);
    fetch(`/api/v1/clubs/${clubId}`)
    .then( res => res.json() )
    .then( response => {
      console.log(response);

      if (response.errors) console.log(response.errors)
    })
  }
}

const createClub = clubJSON => ({
  type: "CREATE_CLUB",
  club: clubJSON
});

const updateClub = payload => ({
  type: "UPDATE_CLUB",
  club: payload
})

export {
  fetchClubs,
  postClub
};