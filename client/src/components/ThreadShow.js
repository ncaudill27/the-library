import React, { useState } from 'react';
import CommentList from './CommentList';
import CommentField from './CommentField';
import { Typography, Paper, makeStyles } from '@material-ui/core';

const useStyles = () => ( themes => ({
  card: {
    padding: themes.spacing(2),
    margin: '1em auto'
  }
}));

function ThreadShow ({
  currentUserIsMod,
  currentUser,
  handleSubmit,
  handleChange,
  comments,
  threadId,
  title
}) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);
  
  return (
    <Paper className={classes.card} elevation={2}>
      <Typography variant='h4' onClick={toggleOpen}>
        {title}
      </Typography>
      { !open || <>
            <CommentList comments={comments} currentUserIsMod={currentUserIsMod} />
            <CommentField
              currentUser={currentUser}
              threadId={threadId}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </>
      }
    </Paper>
  );
}

export default ThreadShow;