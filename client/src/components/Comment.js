import React from 'react';
import Avatar from './Avatar';

const Comment = ({id, username, avatar, content, time}) => {
  return (
    <div className="Comment-card">
      <Avatar avatar={avatar} showing={username} />
      <p><strong>{username}</strong> - {time}</p>
      <p>{content}</p>
    </div>
  );
};

export default Comment;