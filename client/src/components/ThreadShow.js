import React, { useState } from 'react';
import CommentList from './CommentList';
import { Typography, Paper, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';

const useStyles = makeStyles( themes => ({
  paper: {
    padding: themes.spacing(1),
    marginBottom: themes.spacing(2),
    backgroundColor: themes.palette.primary.light
  }
}));

function ThreadShow ({
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
        comments={comments}
        currentUserIsMod={currentUserIsMod}
        currentUser={currentUser}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        threadId={id}
      />
    </Paper>
  );
}

const mapStateToProps = ({comments}) => ({
  comments: comments.data,
  commentsPending: comments.pending
});

export default connect(mapStateToProps)(ThreadShow);