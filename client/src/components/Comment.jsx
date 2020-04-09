import React from 'react';

const Comment = ({username, avatar, content, time}) => {
  return (
    <div className="card-comment">
      <img src={avatar} alt={username + '\'s avatar'} />
      <strong>{username}</strong> - <p>{time}</p>
      <p>{content}</p>
    </div>
  );
};

export default Comment;