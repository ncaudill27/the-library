const initialState = {
  data: [],
  pending: false
};

const commentsReducer = (state = initialState, action) => {
  console.log(action)
  switch(action.type) {

    case "BEGIN_COMMENTS_REQUEST":
      return {
        ...state,
        data: [...state.data],
        pending: true
      };

    case "ADD_COMMENTS":
      const comments = action.comments.map(comment => {
        return {
          id: comment.id,
          content: comment.content,
          user_id: comment.user_id,
          board_id: comment.board_id,
          posted: comment.created_at
        };
      });
      return {
        ...state,
        data: state.data.concat(comments),
        pending: false
      };

    default:
      return state;
  }
}

export default commentsReducer;