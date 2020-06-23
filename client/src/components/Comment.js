import React, { useState } from 'react';
import Avatar from './Avatar';
import { connect } from 'react-redux';
import { patchCommentRequest } from '../actions/comments';

const Comment = ({id, userId, content, time, users, currentUser, deleteComment, patchCommentRequest, commentsPending, commentsEditing}) => {

  const user = users.find(user => user.id === userId);
  const {username, avatar} = user;

  const [editable, editableSet] = useState(false);
  const [shown, shownSet] = useState(false);
  const show = () => shownSet(true);
  const hide = () => shownSet(false);

  const [comment, commentSet] = useState(content);


  const editComment = e => {
    e.preventDefault();
    patchCommentRequest({content: comment, id})
    editableSet(false);
  }

  const openEdit = async () => {
    await editableSet(true);
    const input = document.querySelector('#comment-edit');
    input.focus();
  }

  const editForm = () =>
    <form onSubmit={editComment}>
      <input id='comment-edit' type='text' value={comment} onChange={e => commentSet(e.target.value)} />
      <input type='submit' value='Edit' />
      <button onClick={() => editableSet(false)}>Cancel</button>
    </form>
  
  const buttons = () =>
    <div className='buttons' data-comment-id={id}>
      <button className='delete' onClick={deleteComment}>DELETE</button>
      <br/>
      <button className='edit' onClick={openEdit}>EDIT</button>
    </div>;

  const loadContent = () => commentsPending && commentsEditing === id.toString(10) ? null : <p>{content}</p>

  return (
    <div className="Comment" onMouseEnter={show} onMouseLeave={hide}>
      <Avatar avatar={avatar} showing={username} />
      <p><strong>{username}</strong> - {time}</p>
      { editable ? editForm() : loadContent() }
      { currentUser.id === userId && shown && !editable ? buttons() : null }
    </div>
  );
};

const mapStateToProps = ({users, comments}) => ({
  users: users.data,
  currentUser: users.currentUser,
  commentsPending: comments.pending,
  commentsEditing: comments.editing
});


export default connect(mapStateToProps, { patchCommentRequest })(Comment);