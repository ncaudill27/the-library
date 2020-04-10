import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Thread from './Thread';
import ThreadShow from './ThreadShow';

function ThreadList({threads, clubName, comments}) {

  const renderThreads = () => {
    return threads.map(thread => {
      const {id, title} = thread;
      const threadComments = comments.data.filter(comment => parseInt(id, 10) === comment.threadId);
      const lastComment = threadComments.slice(-1)[0]
      const sluggedName = clubName.replace(/ /g, '-').toLowerCase()
      console.log(threadComments);
      
      return (
        <>
        <Router>
          <Route exact path={`/${sluggedName}/:id`} render={({match}) =>
            <ThreadShow key={match.params.id} thread={thread} comments={threadComments} clubSlug={sluggedName} />} />
          <Thread key={id} id={id} title={title} lastComment={lastComment} clubSlug={sluggedName} />
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