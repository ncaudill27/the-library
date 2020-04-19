import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentList from './CommentList';
import CommentField from './CommentField';

class ThreadShow extends Component {
  
  render() {
    const {
      props: {
        currentUser,
        handleSubmit,
        handleChange,
        comments,
        threadId,
        title
      }
    } = this;

    return (
      <div className='Thread-card'>
        <h3>{title}</h3>
        <CommentList comments={comments} />
        <CommentField
          currentUser={currentUser}
          threadId={threadId}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    );
  };
}

const mapStateToProps = ({users}) => ({users});

export default connect(mapStateToProps)(ThreadShow);