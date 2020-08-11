import React, { Component } from 'react';
import CommentList from './CommentList';
import CommentField from './CommentField';
import { Typography, Paper } from '@material-ui/core';

class ThreadShow extends Component {

  state = {
    open: false
  };

  toggleOpen = () => {
    this.state.open ? this.setState({open: false}) : this.setState({open: true});
  }
  
  render() {
    const {
      state: {
        open
      },
      props: {
        currentUserIsMod,
        currentUser,
        handleSubmit,
        handleChange,
        comments,
        threadId,
        title
      },
      toggleOpen,
    } = this;

    return (
      <Paper elevation={2}>
        <Typography variant='h3' onClick={toggleOpen}>
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
  };
}

export default ThreadShow;