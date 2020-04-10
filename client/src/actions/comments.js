const fetchComments = () => {
  return (dispatch) => {
    dispatch({type: "BEGIN_COMMENTS_REQUEST"});
    fetch('http://localhost:3001/api/v1/comments')
    .then(res => res.json())
    .then(json => dispatch(addComments(json)));
  };
};

const addComments = commentsJSON => ({
  type: "ADD_COMMENTS",
  comments: commentsJSON
})

export { fetchComments };