import React from 'react';
import Comment from './Comment';
import { connect } from 'react-redux';

const CommentList = ({comments, users, pending}) => {
  function renderComments() {
    return comments.map(({id, userId, content, posted})=> {
      let poster = users.find(user => user.id === userId)
      
      return <Comment key={id} id={id} username={poster.username} avatar={poster.avatar} content={content} time={posted.toLocaleString('en-US')} />
    });
  }
  
  return (
    <div className='list-comments'>
      {pending === false ? renderComments() : null}
    </div>
  );
}

const mapStateToProps = ({users}) => ({users: users.data, pending: users.pending});


export default connect(mapStateToProps)(CommentList);