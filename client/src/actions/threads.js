const fetchThreads = () => {
  return (dispatch) => {
    dispatch({type: "BEGIN_THREADS_REQUEST"});
    fetch('http://localhost:3001/api/v1/boards')
    .then(res => res.json())
    .then(json => dispatch(addThreads(json)));
  };
};

const addThreads = threadsJSON => ({
  type: "ADD_THREADS",
  threads: threadsJSON
});

export {fetchThreads};
