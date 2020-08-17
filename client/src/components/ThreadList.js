import React from 'react';
import { connect } from 'react-redux';
import ThreadShow from './ThreadShow';
import ThreadForm from './ThreadForm';
import Typography from '@material-ui/core/Typography';

function ThreadList({threads, clubId, currentUser, currentUserIsMod}) {

  const renderThreads = () => {
    return threads.map( thread => {
      return (
        <ThreadShow
          key={thread.id}
          {...thread}
          currentUser={currentUser}
          currentUserIsMod={currentUserIsMod}      
        />
      );
    });
  };

  return <>
    <Typography variant='h3'>
      Threads
    </Typography>
    { !currentUserIsMod || <ThreadForm clubId={clubId} currentUserId={currentUser.id} /> }
    {renderThreads()}
  </>
}

export default ThreadList;