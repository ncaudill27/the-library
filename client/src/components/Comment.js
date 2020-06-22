import React, { useState } from 'react';
import Avatar from './Avatar';
import { connect } from 'react-redux';
import FormField from './FormField';

const Comment = ({id, userId, content, time, users, currentUser, deleteComment}) => {

  const user = users.find(user => user.id === userId);
  const {username, avatar} = user;

  const [editable, editableSet] = useState(false);
  const [shown, shownSet] = useState(false);
  const show = () => shownSet(true);
  const hide = () => shownSet(false);

  const [comment, commentSet] = useState(content);


  const editComment = e => {
    e.preventDefault();
    console.log({content: comment, id})
    
  }
  
  const buttons = () =>
    <div className='buttons' data-comment-id={id}>
      <button className='delete' onClick={deleteComment}>DELETE</button>
      <br/>
      <button className='edit' onClick={() => editableSet(true)}>EDIT</button>
    </div>;

  return (
    <div className="Comment" onMouseEnter={show} onMouseLeave={hide}>
      <Avatar avatar={avatar} showing={username} />
      <p><strong>{username}</strong> - {time}</p>
      {
        editable
        ? <form onSubmit={editComment}>
            <input type='text' value={comment} onChange={e => commentSet(e.target.value)} />
            <input type='submit' value='Edit' />
            <button onClick={() => editableSet(false)}>Cancel</button>
          </form>
        : <p>{content}</p> }
      { currentUser.id === userId && shown && !editable ? buttons() : null }
    </div>
  );
};

const mapStateToProps = ({users}) => ({users: users.data, currentUser: users.currentUser});


export default connect(mapStateToProps)(Comment);