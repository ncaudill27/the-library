const initialState = {
  data: [],
  pending: false
};

const commentsReducer = (state = initialState, action) => {
  let comment;

  switch(action.type) {

    case "BEGIN_COMMENTS_REQUEST":
      return {...state, data: [...state.data], pending: true};

    case "ADD_COMMENTS":
      const comments = action.comments.data.map(comment => {
        return {
          id: comment.id,
          content: comment.attributes.content,
          userId: comment.relationships.user.data.id,
          threadId: comment.relationships.board.data.id,
          posted: new Date(comment.attributes.createdAt)
        };
      });

      return {...state, data: state.data.concat(comments), pending: false};

    case "POST_COMMENT":
      comment = action.payload.data
      const postObj = {
        id: comment.id,
        content: comment.attributes.content,
        userId: comment.relationships.user.data.id,
        threadId: comment.relationships.board.data.id,
        posted: new Date(comment.attributes.createdAt)
      };

      return {...state, data: [...state.data, postObj], pending: false};

    default:
      return state;
  };
}

export default commentsReducer;