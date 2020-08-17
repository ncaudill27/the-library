import React from 'react';
import { connect } from 'react-redux';
import ThreadShow from './ThreadShow';
import ThreadForm from './ThreadForm';
import Typography from '@material-ui/core/Typography';

function ThreadList({threads, clubId, comments, currentUser, currentUserIsMod}) {

  const clubThreads = threads.filter( thread => thread.clubId === clubId );
  const findThreadsComment = threadId => comments.filter(comment => threadId === comment.threadId);

  const renderThreads = () => {
    return clubThreads.map( thread => {
      const { id: threadId, title } = thread;
      const threadComments = findThreadsComment(threadId);

      return (
        <ThreadShow
          key={threadId}
          title ={title}
          threadId={threadId}
          comments={threadComments}
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

const mapStateToProps = ({comments}) => ({
  comments: comments.data,
  commentsPending: comments.pending
});

export default connect(mapStateToProps)(ThreadList);