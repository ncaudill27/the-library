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

const loginRequest = payload => {
  const requestObj = {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    'body': JSON.stringify(payload)
  }  
  return dispatch => {
    dispatch({type: "BEGIN_USERS_REQUEST"});
    fetch('/sessions', requestObj)
    .then(res => res.json())
    .then(user => dispatch(loginUser(user)))
    .catch(errors => console.log(errors));
  }
}

const loginUser = user => ({
  type: "LOGIN_USER",
  user
})

export {
  fetchUsers
};