import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import ThreadShow from './ThreadShow';
import ThreadForm from './ThreadForm';

function ThreadList({threads, club: {id: clubId}, comments, currentUser}) {

  const renderThreads = () => {
    threads = threads.filter(t => t.clubId === clubId);
    return threads.map(thread => {
      const {id: threadId, title} = thread;
      const threadComments = comments.filter(comment => threadId === comment.threadId);
      return (
        <>
          <ThreadShow key={threadId} title ={title} threadId={threadId} comments={threadComments} currentUser={currentUser} />
        </>
      );
    });
  };


  return (
    <div className='Thread-list'>
      <h2>Threads</h2>
      <ThreadForm  clubId={clubId} currentUserId={currentUser.id} />
      {renderThreads()}
    </div>
  );
}

const mapStateToProps = ({comments, threads}) => ({
  comments: comments.data,
  commentsPending: comments.pending,
  threads: threads.data,
  threadsPending: threads.pending
});

export default connect(mapStateToProps)(ThreadList);