const fetchClubs = () => {
  return (dispatch) => {
    dispatch({type: "BEGIN_CLUBS_REQUEST"});
    fetch('http://localhost:3001/api/v1/clubs')
    .then(res => res.json())
    .then(json => dispatch(addClubs(json)));
  };
};

const addClubs = clubsJSON => ({
  type: "ADD_CLUBS",
  clubs: clubsJSON
});

export {
  fetchClubs
};