import React, { Component } from 'react';
import Comment from './Comment';
import { deleteCommentRequest } from '../actions/comments';
import { connect } from 'react-redux';

class CommentList extends Component {

  sortCommentsByCreation(comments) {
    return comments.sort((c1, c2) => new Date(c2.posted) - new Date(c1.posted));
  }
  
  renderComments() {
    const {
      deleteComment,
      sortCommentsByCreation,
      props: {
        comments, usersPending, commentsPending
      }
    } = this;

    const sortedComments = sortCommentsByCreation(comments);

    if (!usersPending && !commentsPending) {
      return sortedComments.map(({id, userId, content, posted})=> {
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

  deleteComment = (e) => {
    console.log(e.target.parentNode.dataset.commentId);
    const commentId = e.target.parentNode.dataset.commentId;
    this.props.deleteCommentRequest(commentId)
    
  }
  
  render() {
  const {usersPending, commentsPending} = this.props

  return (
    <div className='list-comments'>
      {!usersPending && !commentsPending ? this.renderComments() : <>loading..</>}
    </div>
  );
  }
}

export default connect(null, { deleteCommentRequest })(CommentList);