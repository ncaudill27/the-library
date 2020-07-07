import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentList from './CommentList';
import CommentField from './CommentField';

class ThreadShow extends Component {

  state = {
    shown: false
  };

  toggle = () => {
    this.state.shown ? this.setState({shown: false}) : this.setState({shown: true});
  }
  
  render() {
    const {
      state: {
        shown
      },
      props: {
        currentUserIsMod,
        currentUser,
        handleSubmit,
        handleChange,
        comments,
        threadId,
        title
      },
      toggle,
    } = this;

    const currentState = shown ? 'Thread-card' : 'Thread-link';

    return (
      <div className={currentState}>
        <h3 onClick={toggle}>{title}</h3>
        {
          shown
          ? <>
            <CommentList comments={comments} currentUserIsMod={currentUserIsMod} />
            <CommentField
              currentUser={currentUser}
              threadId={threadId}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
            </>
          : null
        }
      </div>
    );
  };
}

export default ThreadShow;