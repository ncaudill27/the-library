import React from 'react';
import Comment from './Comment';
import CommentField from './CommentField';
import { deleteCommentRequest } from '../actions/comments';
import { connect } from 'react-redux';

function CommentList({
  open,
  comments,
  threadId,
  currentUser,
  handleChange,
  handleSubmit,
  currentUserIsMod,
  currentUserIsMember,
  deleteCommentRequest,
}) {
  
  const sortCommentsByCreation = () => {
    return comments.sort( (c1, c2) => new Date(c1.posted) - new Date(c2.posted) );
  }
  
  const renderComments = () => {

    let sortedComments = sortCommentsByCreation();

    return sortedComments.map( comment => {
      return (
        <Comment
          key={comment.id}
          {...comment}
          deleteComment={deleteComment}
          currentUserIsMod={currentUserIsMod}
        /> 
      );
    });
  }

  const deleteComment = e => {
    const commentId = e.target.parentNode.dataset.commentId;
    deleteCommentRequest(commentId);
  }
  
  return (
    <>
      { open ? renderComments() : null }
      {
        open && currentUserIsMember
        ? <CommentField
          threadId={threadId}
          currentUser={currentUser}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        : null
      }
    </>
  );
}

export default connect( null, { deleteCommentRequest })(CommentList);