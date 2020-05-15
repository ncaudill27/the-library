import React from 'react';
import Comment from './Comment';
import { connect } from 'react-redux';

const CommentList = ({comments, users, usersPending, commentsPending}) => {

  function sortCommentsByCreation(comments) {
    return comments.sort((c1, c2) => new Date(c2.posted) - new Date(c1.posted));
  }
  
  function renderComments() {
    comments = sortCommentsByCreation(comments);
    if (!usersPending && !commentsPending) {
      return comments.map(({id, userId, content, posted})=> {
        let poster = users.find(user => user.id === userId); //! Cannot find user at times. Figure out when/why
        
        return <Comment key={id} id={id} username={poster.username} avatar={poster.avatar} content={content} time={posted.toLocaleString('en-US')} />;
      });
    };
  }
  
  return (
    <div className='list-comments'>
      {renderComments()}
    </div>
  );
}

const mapStateToProps = ({users, comments}) => ({
  users: users.data,
  usersPending: users.pending,
  commentsPending: comments.pending
});


export default connect(mapStateToProps)(CommentList);