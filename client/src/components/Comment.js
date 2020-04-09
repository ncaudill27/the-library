import React from 'react';
import Avatar from './Avatar';

const Comment = ({id, username, avatar, content, time}) => {
  return (
    <div className="card-comment">
      <Avatar avatar={avatar} showing={username} />
      <strong>{username}</strong> - <p>{time}</p>
      <p>{content}</p>
    </div>
  );
};

export default Comment;