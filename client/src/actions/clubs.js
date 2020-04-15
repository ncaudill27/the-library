const begin = func => func({type: "BEGIN_CLUBS_REQUEST"});

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
  const token = localStorage.getItem('token');
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
    .then(response => {
      console.log(response);
      if (response.errors) return console.log(response.errors);
      createClub(response.club)
      
    })
  }
  
}

const createClub = clubJSON => ({
  type: "CREATE_CLUB",
  clubJSON
})

export {
  fetchClubs
};