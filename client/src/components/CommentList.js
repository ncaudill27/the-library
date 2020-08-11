import React, { Component } from 'react';
import Comment from './Comment';
import CommentField from './CommentField';
import { deleteCommentRequest } from '../actions/comments';
import { connect } from 'react-redux';
import { Grow } from '@material-ui/core';

function CommentList({ deleteCommentRequest, comments, open, threadId, handleChange, handleSubmit, currentUser, currentUserIsMod }) {

  const sortCommentsByCreation = () => {
    return comments.sort((c1, c2) => new Date(c2.posted) - new Date(c1.posted));
  }
  
  const renderComments = () => {

    let sortedComments = sortCommentsByCreation();

    return sortedComments.map( comment => {
      return (
        <Grow in={open} style={{transformOrigin: '0 0 0'}} { ...(open ? { timeout: 500 } : {}) }>
          <Comment
            key={comment.id}
            {...comment}
            deleteComment={deleteCommentRequest}
            currentUserIsMod={currentUserIsMod}
          /> 
        </Grow>
      )
    });
  }

  const deleteComment = (e) => {
    const commentId = e.target.parentNode.dataset.commentId;
    this.props.deleteCommentRequest(commentId);
  }
  
  return (
    <div className='list-comments'>
      { renderComments() }
      <CommentField
        currentUser={currentUser}
        threadId={threadId}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default connect( null, { deleteCommentRequest })(CommentList);