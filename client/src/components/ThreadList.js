import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Thread from './Thread';
import ThreadShow from './ThreadShow';

function ThreadList({threads, club, comments}) {

  const renderThreads = () => {
    return threads.map(thread => {
      const {id, title} = thread;
      const threadComments = comments.data.filter(comment => id === comment.threadId);
      // const sluggedName = club.name.replace(/ /g, '-').toLowerCase()
      return (
        <>
        <Router>
          <Switch>
            <Route exact path={`/clubs/${club.id}/thread/:id`} render={({match}) =>
              <ThreadShow key={match.params.id} thread={thread} comments={threadComments} club={club} />} />
            <Thread key={id} id={id} title={title} club={club} comments={threadComments} />
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