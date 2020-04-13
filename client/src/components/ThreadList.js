import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Thread from './Thread';
import ThreadShow from './ThreadShow';

function ThreadList({threads, club, comments: {data: comments, pending}, currentUser}) {

  const renderThreads = () => {
    return threads.map(thread => {
      const {id, title, clubId, commentIds} = thread;
      const threadComments = comments.filter(comment => id === comment.threadId);
      return (
        <>
        <Router key={id}>
          <Switch key={id}>
            <Route key={id} exact path={`/clubs/${club.id}/thread/:id`} render={({match}) =>
              <ThreadShow key={match.params.id} thread={thread} comments={threadComments} currentUser={currentUser} />} />
            <Thread key={id} id={id} title={title} club={club} comments={threadComments} currentUser={currentUser} />
          </Switch>
        </Router>
        </>
      )
    });
  };
  
  
  return (
    <div className='Thread-list'>
      <h2>Threads</h2>
      {renderThreads()}
    </div>
  );
}

const mapStateToProps = ({comments}) => ({comments});

export default connect(mapStateToProps)(ThreadList);