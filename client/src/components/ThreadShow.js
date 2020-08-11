import React, { useState } from 'react';
import CommentList from './CommentList';
import { Typography, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles( themes => ({
  card: {
    padding: themes.spacing(1),
    margin: themes.spacing(1)
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
            <CommentList
              comments={comments}
              currentUserIsMod={currentUserIsMod}
              currentUser={currentUser}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              threadId={threadId}
            />
          </>
      }
    </Paper>
  );
}

export default ThreadShow;