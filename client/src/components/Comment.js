import React, { useState } from 'react';
import Avatar from './Avatar';
import { connect } from 'react-redux';
import { patchCommentRequest } from '../actions/comments';

const Comment = ({id, userId, content, posted, users, currentUser, deleteComment, patchCommentRequest, commentsPending, commentsEditing, currentUserIsMod}) => {

  const user = users.find(user => user.id === userId);
  const {username, avatar} = user;

  const [editable, editableSet] = useState(false);
  const toggleEditable = () => editableSet(!editable);
  
  const [shown, shownSet] = useState(false);
  const toggleShown = () => shownSet(!shown);

  const [comment, commentSet] = useState(content);

  const isContentOwner = () => currentUser.id === userId;
  const isOwnerIsModShownNotEditable = () => ( isContentOwner() || currentUserIsMod ) && shown && !editable;
  const isOwnerNotMod = () => !currentUserIsMod || isContentOwner();

  const editComment = e => {
    e.preventDefault();
    patchCommentRequest({content: comment, id})
    toggleEditable();
  }

  const openEdit = async () => {
    await toggleEditable();
    const input = document.querySelector('#comment-edit');
    input.focus();
  }

  const editForm = () =>
    <form onSubmit={editComment}>
      <input id='comment-edit' type='text' value={comment} onChange={ e => commentSet(e.target.value) } />
      <input type='submit' value='Edit' />
      <button onClick={toggleEditable}>Cancel</button>
    </form>;

  const renderOptions = () =>
    <div className='buttons' data-comment-id={id}>
      <button className='delete' onClick={deleteComment}>DELETE</button>
      <br/>
      { isOwnerNotMod() ? <button className='edit' onClick={openEdit}>EDIT</button> : null }
    </div>;

  const loadContent = () => commentsPending && commentsEditing === id.toString(10) ? null : <p>{content}</p>

  return (
    <div className="Comment" onMouseEnter={toggleShown} onMouseLeave={toggleShown}>
      <Avatar avatar={avatar} showing={username} />
      <p><strong>{username}</strong> - {posted.toLocaleString('en-US')}</p>
      { editable ? editForm() : loadContent() }
      { isOwnerIsModShownNotEditable() ? renderOptions() : null }
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