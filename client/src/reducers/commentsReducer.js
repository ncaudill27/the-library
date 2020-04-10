const initialState = {
  data: [],
  pending: false
};

const commentsReducer = (state = initialState, action) => {
  let comment

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
          userId: comment.user_id,
          threadId: comment.board_id,
          posted: new Date(comment.created_at)
        };
      });
      return {
        ...state,
        data: state.data.concat(comments),
        pending: false
      };

    case "POST_COMMENT":
      comment = action.payload
      const postObj = {
        id: comment.id,
        content: comment.content,
        userId: comment.user_id,
        threadId: comment.board_id,
        posted: new Date(comment.created_at)
      };
      return {
        ...state,
        data: [...state.data, postObj],
        pending: false
      };

    default:
      return state;
  }
}

export default commentsReducer;