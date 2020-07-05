import React, { Component } from 'react';
import Comment from './Comment';
import { deleteCommentRequest } from '../actions/comments';
import { connect } from 'react-redux';

class CommentList extends Component {

  sortCommentsByCreation(comments) {
    return comments.sort((c1, c2) => new Date(c2.posted) - new Date(c1.posted));
  }
  
  renderComments() {
    let {
      deleteComment,
      sortCommentsByCreation,
      props: {
        comments,
        threadId
      }
    } = this;
    
    comments = comments.filter(c => c.threadId === threadId);
    comments = sortCommentsByCreation(comments);

    return comments.map(({id, userId, content, posted})=> {
      return <Comment
        key={id}
        id={id}
        userId={userId}
        content={content}
        time={posted.toLocaleString('en-US')}
        deleteComment={deleteComment}
        mod={this.props.mod}
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

const mapStateToProps = ({comments}) => ({comments: comments.data});


export default connect(mapStateToProps, { deleteCommentRequest })(CommentList);