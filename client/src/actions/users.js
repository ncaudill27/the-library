const fetchUsers = () => {
  return (dispatch) => {
    dispatch({type: "BEGIN_USERS_REQUEST"});
    fetch('/api/v1/users')
    .then(res => res.json())
    .then(json => dispatch(addUsers(json)));
  };
};

const addUsers = usersJSON => ({
  type: "ADD_USERS",
  users: usersJSON
});

const addClub = (clubId, userId) => ({
  type: "ADD_CLUB",
  clubId,
  userId
})

const authorizeToken = () => {
  const token = localStorage.getItem('token');
  const requestObj = {
    'method': 'POST',
    'headers': {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    }
  }
  return dispatch => {
    fetch('/auth/auto', requestObj)
    .then(res => res.json())
    .then(response => {
      if (response.failure) return console.log(response.failure);
      dispatch(loginUser(response.data));
    });
  };
};

const loginUser = userData => ({
  type: "LOGIN_USER",
  userData
});

export {
  fetchUsers,
  addClub,
  authorizeToken
};