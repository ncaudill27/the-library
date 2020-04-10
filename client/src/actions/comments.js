const fetchComments = () => {
  return dispatch => {
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

const postComment = payload => (
  dispatch => {
    dispatch({type: "BEGIN_COMMENTS_REQUEST"});
    fetch('http://localhost:3001/api/v1/comments', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: payload
    })
    .then(res => res.json())
    .then(json => dispatch(acceptPost(json)));
  }
);

const acceptPost = commentJSON => ({
  type: "POST_COMMENT",
  payload: commentJSON
});

export {
  fetchComments,
  postComment
 };