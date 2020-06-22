import React, { useState } from 'react';
import Avatar from './Avatar';
import { connect } from 'react-redux';

const Comment = ({id, userId, content, time, users, currentUser, deleteComment}) => {

  const user = users.find(user => user.id === userId);
  const {username, avatar} = user;

  const [shown, shownSet] = useState(false);
  const show = () => shownSet(true);
  const hide = () => shownSet(false);

  const buttons = () =>
    <div className='buttons' data-comment-id={id}>
      <button className='delete' onClick={deleteComment}>DELETE</button>
      <br/>
      <button className='edit' >EDIT</button>
    </div>

  return (
    <div className="Comment" onMouseEnter={show} onMouseLeave={hide}>
      <Avatar avatar={avatar} showing={username} />
      <p><strong>{username}</strong> - {time}</p>
      <p>{content}</p>
      { currentUser.id === userId && shown ? buttons() : null }
    </div>
  );
};

const mapStateToProps = ({users}) => ({users: users.data, currentUser: users.currentUser});


export default connect(mapStateToProps)(Comment);