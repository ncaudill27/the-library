import React from 'react';
import Comment from './Comment';

const CommentList = ({comments}) => {
  function renderComments() {
    return comments.map(({id, username, avatar, content, time})=> {
      return <Comment id={id} username={username} avatar={avatar} content={content} time={time} />
    });
  }
  
  return (
    <div className='list-comments'>
      {renderComments()}
    </div>
  );
}

export default CommentList;