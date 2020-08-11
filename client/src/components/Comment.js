import React, { useState } from 'react';
// import Avatar from './Avatar';
import { connect } from 'react-redux';
import { patchCommentRequest } from '../actions/comments';

import { Avatar, Typography, Box, Paper } from '@material-ui/core';

const Comment = ({
  id,
  userId,
  content,
  posted,
  users,
  currentUser,
  deleteComment,
  patchCommentRequest,
  commentsPending,
  commentsEditing,
  currentUserIsMod
}) => {

  const user = users.find(user => user.id === userId);
  const {username, avatar} = user;

  const [editable, editableSet] = useState(false);
  const toggleEditable = () => editableSet(!editable);
  
  const [shown, shownSet] = useState(false);
  const toggleShown = () => shownSet( prev => !prev );

  const [comment, commentSet] = useState(content);

  const isContentOwner = () => currentUser.id === userId;
  const isOwnerIsModShownNotEditable = () => ( isContentOwner() || currentUserIsMod ) && shown && !editable;
  const isOwnerNotMod = () => !currentUserIsMod || isContentOwner();

  const editComment = e => {
    e.preventDefault();
    patchCommentRequest({content: comment, id})
    toggleEditable();
  }

  const parseTime = timeStamp => {
    timeStamp = new Date(timeStamp);
    const date = timeStamp.getDate();
    const month = timeStamp.getMonth();
    const year = timeStamp.getFullYear().toString().slice(2);

    return `${month + 1}/${date}/${year}`
  }

  const openEdit = async () => {
    await toggleEditable();
    const input = document.getElementById('comment-edit');
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

  const loadContent = () => commentsPending && commentsEditing === id.toString(10) ? null : <Typography variant='body1' paragraph>{content}</Typography>

  return (
    <Paper onMouseEnter={toggleShown} onMouseLeave={toggleShown}>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Avatar src={avatar} alt={username + "'s avatar"} />
        <Typography display='block' variant='h6' noWrap>
          {username}
        </Typography>
        <Typography variant='caption'>
          • {parseTime(posted)}
        </Typography>
      </Box>
      { editable ? editForm() : loadContent() }
      { isOwnerIsModShownNotEditable() ? renderOptions() : null }
    </Paper>
  );
};

const mapStateToProps = ({users, comments}) => ({
  users: users.data,
  currentUser: users.currentUser,
  commentsPending: comments.pending,
  commentsEditing: comments.editing
});


export default connect(mapStateToProps, { patchCommentRequest })(Comment);