import React, { Component } from 'react';
import Comment from './Comment';
import CommentField from './CommentField';
import { deleteCommentRequest } from '../actions/comments';
import { connect } from 'react-redux';
import { Grow, Box } from '@material-ui/core';

function CommentList({
  open,
  comments,
  threadId,
  currentUser,
  handleChange,
  handleSubmit,
  currentUserIsMod,
  deleteCommentRequest
}) {
  console.log(open);
  const sortCommentsByCreation = () => {
    return comments.sort((c1, c2) => new Date(c2.posted) - new Date(c1.posted));
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
    <Box>
      { !open || renderComments() }
      { !open || <CommentField
        currentUser={currentUser}
        threadId={threadId}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />}
    </Box>
  );
}

export default connect( null, { deleteCommentRequest })(CommentList);