import React, { useState } from 'react';
import Avatar from './Avatar';
import { connect } from 'react-redux';

const Comment = ({id, userId, content, time, users, currentUser, deleteComment}) => {

  const user = users.find(user => user.id === userId);
  const {username, avatar} = user;

  const [shown, shownSet] = useState(false);
  const show = () => shownSet(true);
  const hide = () => shownSet(false);

  return (
    <div className="Comment" data-comment-id={id} onMouseEnter={show} onMouseLeave={hide}>
      <Avatar avatar={avatar} showing={username} />
      <p><strong>{username}</strong> - {time}</p>
      <p>{content}</p>
      { currentUser.id === userId && shown ? <button onClick={deleteComment}>DELETE</button> : null }
    </div>
  );
};

const mapStateToProps = ({users}) => ({users: users.data, currentUser: users.currentUser});


export default connect(mapStateToProps)(Comment);