import React, { useState } from 'react';
import CommentList from './CommentList';
import { Typography, Paper, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';

const useStyles = makeStyles( themes => ({
  paper: {
    padding: themes.spacing(1),
    marginTop: themes.spacing(2),
    marginBottom: themes.spacing(2),
    backgroundColor: '#f0f0f0'
  }
}));

function ThreadShow ({
  currentUserIsMember,
  currentUserIsMod,
  currentUser,
  handleSubmit,
  handleChange,
  comments,
  title,
  id
}) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  comments = comments.filter(comment => id === comment.threadId);
  
  return (
    <Paper className={classes.paper} elevation={5}>
      <Typography variant='h4' onClick={toggleOpen}>
        {title}
      </Typography>
      <CommentList
        open={open}
        threadId={id}
        comments={comments}
        currentUser={currentUser}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        currentUserIsMod={currentUserIsMod}
        currentUserIsMember={currentUserIsMember}
      />
    </Paper>
  );
}

const mapStateToProps = ({comments}) => ({
  comments: comments.data,
  commentsPending: comments.pending
});

export default connect(mapStateToProps)(ThreadShow);