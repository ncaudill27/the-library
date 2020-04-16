const initialState = {
  data: [],
  pending: false
}

const threadsReducer = (state = initialState, action) => {
  switch(action.type) {

    case "BEGIN_THREADS_REQUEST":
      return {...state, data: [...state.data], pending: true};

    case "ADD_THREADS":
      const threads = action.threads.data.map(thread => {
        return {
          id: thread.id,
          title: thread.attributes.title,
          clubId: thread.relationships.club.data.id,
          commentIds: thread.relationships.comments.data.map(comment => comment.id)
        };
      });

      return {...state, data: state.data.concat(threads), pending: false};

    case "ADD_THREAD":
      console.log(action.payload);
      debugger
      
      const thread = {
        
      }
      return state;

    default:
      return state;
  };
};

export default threadsReducer;