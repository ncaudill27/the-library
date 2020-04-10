const fetchUsers = () => {
  return (dispatch) => {
    dispatch({type: "BEGIN_USERS_REQUEST"});
    fetch('http://localhost:3001/api/v1/users')
    .then(res => res.json())
    .then(json => dispatch(addUsers(json)));
  };
};

const addUsers = usersJSON => ({
  type: "ADD_USERS",
  users: usersJSON
});

export {
  fetchUsers
};