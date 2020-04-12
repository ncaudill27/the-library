const fetchComments = () => {
  return dispatch => {
    dispatch({type: "BEGIN_COMMENTS_REQUEST"});
    fetch('/api/v1/comments')
    .then(res => res.json())
    .then(json => dispatch(addComments(json)));
  };
};

const addComments = comments => ({
  type: "ADD_COMMENTS",
  comments
})

const postComment = payload => (
  dispatch => {
    dispatch({type: "BEGIN_COMMENTS_REQUEST"});
    fetch('/api/v1/comments', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(json => dispatch(acceptPost(json)))
    .catch(errors => console.log(errors))
  }
);

const acceptPost = payload => ({
  
  type: "POST_COMMENT",
  payload
});

export {
  fetchComments,
  postComment
 };