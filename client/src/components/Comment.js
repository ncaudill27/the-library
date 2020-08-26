import React, { useState } from 'react';
import { connect } from 'react-redux';
import { patchCommentRequest } from '../actions/comments';

import { makeStyles, Avatar, Typography, Box, Button, Container, TextField } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles( theme => ({
  comment: {
    borderBottom: `1px solid ${theme.palette.primary.dark}`,
    marginTop: theme.spacing(1)
  },
  pushBot: {
    marginBottom: theme.spacing(1)
  },
  username: {
    marginLeft: theme.spacing(1)
  },
  edit: {
    backgroundColor: theme.palette.primary.dark
  },
  delete: {
    backgroundColor: theme.palette.secondary.dark
  }
}))

const EditForm = ({comment, commentSet, editComment, toggleEditable}) => {
  const classes = useStyles();

  return (
    <Box display='flex' alignItems='center' justifyContent='flex-start' className={classes.pushBot}>
      <TextField id='comment-edit' type='text' variant='outlined' size='small' color='secondary' value={comment} onChange={ e => commentSet(e.target.value) } />
      <Button size='small' onClick={editComment} variant='contained'>Edit</Button>
      <Button size='small' onClick={toggleEditable} variant='contained'>Cancel</Button>
    </Box>
  );
}

const CommentOptions = ({id, toggleEditable, toggleShown, deleteComment, isOwnerNotMod}) => {
  const classes = useStyles();

  return (
    <Box display='flex' justifyContent='flex-end' data-comment-id={id} className={classes.pushBot}>
      { isOwnerNotMod() ? <Button className={classes.edit} variant='contained' onClick={toggleEditable}>EDIT</Button> : null }
      <Button className={classes.delete} variant='contained' onClick={deleteComment}>DELETE</Button>
      <Button onClick={toggleShown}><ClearIcon /></Button>
    </Box>
  );
}

const CommentContent = ({commentsPending, commentsEditing, id, content}) => {
  const classes = useStyles();

  if (commentsPending && commentsEditing === id.toString(10)) return null
  return <Typography variant='body1' className={classes.pushBot}>{content}</Typography>
}

const Comment = ({
  id,
  users,
  posted,
  userId,
  content,
  currentUser,
  deleteComment,
  commentsEditing,
  commentsPending,
  currentUserIsMod,
  patchCommentRequest
}) => {

  const classes = useStyles();
  
  const user = users.find(user => user.id === userId);
  const {username, avatar} = user;

  const [editable, editableSet] = useState(false);
  const toggleEditable = () => editableSet( prev => !prev);
  
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

// todo move to utils folder
  const parseTime = timeStamp => {
    timeStamp = new Date(timeStamp);
    const date = timeStamp.getDate();
    const month = timeStamp.getMonth();
    const year = timeStamp.getFullYear().toString().slice(2);

    return `${month + 1}/${date}/${year}`
  }

  return (
    <Container onMouseEnter={toggleShown} onMouseLeave={toggleShown} className={classes.comment}>
      <Box display='flex' alignItems='center' justifyContent='space-between' className={classes.pushBot}>
        <Box display='flex' alignItems='center' justifyContent='flex-start'>
          <Avatar src={avatar} alt={username + "'s avatar"} />
          <Typography display='block' variant='h6' noWrap className={classes.username}>
            {username}
          </Typography>
        </Box>
        <Typography variant='caption'>
          • {parseTime(posted)}
        </Typography>
      </Box>
      {
         editable
         ? (
          <EditForm
            comment={comment}
            commentSet={commentSet}
            editComment={editComment}
            toggleEditable={toggleEditable}
          />
         )
         : (
          <CommentContent
            id={id}
            content={content}
            commentsPending={commentsPending}
            commentsEditing={commentsEditing}
          />
         )
      }
      {
         isOwnerIsModShownNotEditable()
         ? (
          <CommentOptions
            id={id}
            toggleShown={toggleShown}
            deleteComment={deleteComment}
            isOwnerNotMod={isOwnerNotMod}
            toggleEditable={toggleEditable}
          />
         )
         : null 
      }
    </Container>
  );
};

const mapStateToProps = ({users, comments}) => ({
  users: users.data,
  currentUser: users.currentUser,
  commentsPending: comments.pending,
  commentsEditing: comments.editing
});


export default connect(mapStateToProps, { patchCommentRequest })(Comment);