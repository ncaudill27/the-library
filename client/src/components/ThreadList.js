import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import ThreadShow from './ThreadShow';
import ThreadLink from './ThreadLink';

function ThreadList({threads, club: {id: clubId}, comments: {data: comments}, currentUser}) {

  const renderThreads = () => {
    return threads.map(thread => {
      const {id: threadId, title} = thread;
      const threadComments = comments.filter(comment => threadId === comment.threadId);
      return (
        <>
        <Router key={threadId}>
          <Switch key={threadId}>

            <Route key={threadId} exact path={`/clubs/${clubId}/thread/:id`} render={({match: {params}}) =>
              <ThreadShow key={params.id} thread={thread} comments={threadComments} currentUser={currentUser} />} />

            <ThreadLink to={`/clubs/${clubId}/thread/${threadId}`} exact className='Navlink'
              ><h3>{title}</h3></ThreadLink>

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