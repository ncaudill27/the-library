const begin = func => func({type: "BEGIN_USERS_REQUEST"});

const fetchUsers = () => {
  return (dispatch) => {
    begin(dispatch);
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
});

const loginRequest = payload => {
  const requestObj = {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    'body': JSON.stringify(payload)
  };

  return dispatch => {
    begin(dispatch);
    fetch('/auth/login', requestObj)
    .then(res => res.json())
    .then(response => {      
      if (response.failure) return console.log(response.failure); //TODO Handle this
      localStorage.setItem('token', response.auth_token);
      dispatch(loginUser(response.user.data));
    })
    .catch(errors => console.log(errors)); 
  }
}

const authorizeToken = () => {
  const token = localStorage.getItem('token');
  const requestObj = {
    'method': 'POST',
    'headers': {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    }
  };
  return dispatch => {
    begin(dispatch);
    fetch('/auth/auto', requestObj)
    .then(res => res.json())
    .then(response => {
      if (response.failure) return console.log(response.failure);
      dispatch(loginUser(response.data));
    });
  };
};

const userPostRequest = payload => {
  const requestObj = {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    },
    'body': JSON.stringify(payload)
  }
  
  return dispatch => {
    begin(dispatch);
    fetch('/api/v1/users', requestObj)
    .then(res => res.json())
    .then(response => {
      console.log(response);
      if (response.errors) return console.log(response.errors);
      localStorage.setItem('token', response.auth_token);
      dispatch(loginUser(response.user.data));
    });
  };
};

const updateUserRequest = (payload, userId) => {
  const token = localStorage.getItem('token');
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
    fetch(`/api/v1/users/${userId}`, requestObj)
    .then(res => res.json())
    .then(response => {
      dispatch(loginUser(response.user.data));
    });
  }
};

const leaveClub = ({clubId}) => ({
  type: "LEAVE_CLUB",
  clubId
})

const loginUser = userData => ({
  type: "LOGIN_USER",
  userData
});

const logOutUser = () => ({
  type: "LOGOUT_USER"
});



export {
  fetchUsers,
  addClub,
  authorizeToken,
  loginRequest,
  logOutUser,
  loginUser,
  userPostRequest,
  updateUserRequest,
  leaveClub
};