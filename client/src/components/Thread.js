import React from 'react';

const Thread = ({title, lastComment}) => {
  console.log(lastComment.posted)
  return (
    <div className='Thread'>
      <h3>{title}</h3>
      <p>Last comment: </p>
    </div>
  );
}
export default Thread;