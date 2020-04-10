import React from 'react';
import Comment from './Comment';

const CommentList = ({comments, users}) => {
  function renderComments() {
    return comments.map(({id, userId, avatar, content, posted})=> {
      let poster = users.find(user => user.id === userId)
      return <Comment key={id} id={id} username={poster.username} avatar={avatar} content={content} time={posted.toLocaleString('en-US')} />
    });
  }
  
  return (
    <div className='list-comments'>
      {renderComments()}
    </div>
  );
}

export default CommentList;