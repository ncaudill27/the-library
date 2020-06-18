import React from 'react';
import Comment from './Comment';
import { deleteCommentRequest } from '../actions/comments';
import { connect } from 'react-redux';

const CommentList = ({comments, usersPending, commentsPending, deleteComment}) => {

  function sortCommentsByCreation(comments) {
    return comments.sort((c1, c2) => new Date(c2.posted) - new Date(c1.posted));
  }
  
  function renderComments() {
    comments = sortCommentsByCreation(comments);
    if (!usersPending && !commentsPending) {
      return comments.map(({id, userId, content, posted})=> {
        return <Comment
        key={id}
        id={id}
        userId={userId}
        content={content}
        time={posted.toLocaleString('en-US')}
        deleteComment={deleteComment}
        />;
      });
    } else {
      return <>loading...</>
    };
  }

  function deleteComment(e) {

    const commentId = e.target.parentNode.dataset.commentId;
    deleteCommentRequest(commentId);
    
  }
  
  return (
    <div className='list-comments'>
      {!usersPending && !commentsPending ? renderComments() : <>loading..</>}
    </div>
  );
}

export default connect(null, { deleteCommentRequest })(CommentList);