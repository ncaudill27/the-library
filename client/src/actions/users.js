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

export {
  fetchUsers,
  addClub
};