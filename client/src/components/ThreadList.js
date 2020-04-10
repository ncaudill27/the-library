import React from 'react';
import { connect } from 'react-redux';
import Thread from './Thread';

function ThreadList({threads, comments}) {

  const renderThreads = () => {
    return threads.map(thread => {
      const {id, title} = thread;
      const threadComments = comments.data.filter(comment => parseInt(id, 10) === comment.threadId);
      const lastComment = threadComments.slice(-1)[0]
      return <Thread key={id} title={title} lastComment={lastComment} />;
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