import React, { Component } from 'react';
import Comment from './Comment';
import { deleteCommentRequest } from '../actions/comments';
import { connect } from 'react-redux';

class CommentList extends Component {

  sortCommentsByCreation = () => {
    return this.props.comments
    .sort((c1, c2) => new Date(c2.posted) - new Date(c1.posted));
  }
  
  renderComments() {
    let {
      deleteComment,
      sortCommentsByCreation,
      props: {
        comments
      }
    } = this;

    comments = sortCommentsByCreation();

    return comments.map( comment => {
      return <Comment
        key={comment.id}
        {...comment}
        deleteComment={deleteComment}
        currentUserIsMod={this.props.currentUserIsMod}
      />;
    });
  }

  deleteComment = (e) => {
    const commentId = e.target.parentNode.dataset.commentId;
    this.props.deleteCommentRequest(commentId);
  }
  
  render() {
    return (
      <div className='list-comments'>
        {this.renderComments()}
      </div>
    );
  }
}

export default connect( null, { deleteCommentRequest })(CommentList);