import React from 'react';
import Avatar from './Avatar';
import { connect } from 'react-redux';

const Comment = ({id, userId, content, time, users, deleteComment}) => {
  const user = users.find(user => user.id === userId);
  const {username, avatar} = user
  
  return (
    <div className="Comment-card">
      <Avatar avatar={avatar} showing={username} />
      <p><strong>{username}</strong> - {time}</p>
      <p>{content}</p>
      <button onClick={() => deleteComment(id)}>DELETE</button>
    </div>
  );
};

const mapStateToProps = ({users}) => ({users: users.data});


export default connect(mapStateToProps)(Comment);