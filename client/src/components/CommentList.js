import React from 'react';
import Comment from './Comment';

const CommentList = ({comments, usersPending, commentsPending}) => {

  function sortCommentsByCreation(comments) {
    return comments.sort((c1, c2) => new Date(c2.posted) - new Date(c1.posted));
  }
  
  function renderComments() {
    comments = sortCommentsByCreation(comments);
    if (!usersPending && !commentsPending) {
      return comments.map(({id, userId, content, posted})=> {
        return <Comment key={id} id={id} userId={userId} content={content} time={posted.toLocaleString('en-US')} />;
      });
    } else {
      return <>loading...</>
    };
  }
  
  return (
    <div className='list-comments'>
      {!usersPending && !commentsPending ? renderComments() : <>loading..</>}
    </div>
  );
}

export default CommentList;