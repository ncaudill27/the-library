import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import ThreadShow from './ThreadShow';
import ThreadForm from './ThreadForm';
import StyledLink from './StyledLink';

function ThreadList({threads, club: {id: clubId}, comments, currentUser}) {

  const renderThreads = () => {
    threads = threads.filter(t => t.clubId === clubId);
    return threads.map(thread => {
      const {id: threadId, title} = thread;
      const threadComments = comments.filter(comment => threadId === comment.threadId);
      return (
        <>
        <Router key={threadId}>
          <Switch key={threadId}>

            <Route key={threadId} exact path={`/clubs/${clubId}/thread/:id`} render={({match: {params}}) =>
              <ThreadShow key={params.id} title ={title} threadId={threadId} comments={threadComments} currentUser={currentUser} />} />

            <StyledLink key={threadId} to={`/clubs/${clubId}/thread/${threadId}`} exact className='Navlink'
            styling='Thread-link'><h3 key={threadId}>{title}</h3></StyledLink>

          </Switch>
        </Router>
        </>
      );
    });
  };


  return (
    <div className='Thread-list'>
      <h2>Threads</h2>
      <Router>
        <Switch>
        <Route exact path={`/clubs/${clubId}/threads/new`} render={({match: {params}}) =>
                <ThreadForm  clubId={clubId} currentUserId={currentUser.id} /> } />
        <StyledLink
          to={`/clubs/${clubId}/threads/new`}
          exact
          className='Navlink'
          styling='Thread-form-link'
        ><h3>Start a new thread</h3></StyledLink>
        </Switch>
      </Router>
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