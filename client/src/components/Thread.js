import React from 'react';

const Thread = ({title, comments}) => {
  console.log(comments.slice(-1));
  return (
  <div className='Thread'>
    <h3>{title}</h3>
    <p>Last comment: {comments.slice(-1)[0].posted}</p>
  </div>);
}
export default Thread;