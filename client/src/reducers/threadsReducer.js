const initialState = {
  data: [],
  pending: false
}

const threadsReducer = (state = initialState, action) => {
  switch(action.type) {

    case "BEGIN_THREADS_REQUEST":
      return {
        ...state,
        data: [...state.data],
        pending: true
      };

    case "ADD_THREADS":
      const threads = action.threads.data.map(thread => {
        return {
          id: parseInt(thread.id, 10),
          title: thread.attributes.title,
          clubId: parseInt(thread.relationships.club.data.id, 10),
          commentIds: thread.relationships.comments.data.map(comment => parseInt(comment.id, 10))
        };
      });
      return {
        ...state,
        data: state.data.concat(threads),
        pending: false
      };
    
    default:
      return state;
  };
};

export default threadsReducer;