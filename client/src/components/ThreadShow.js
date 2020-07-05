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
        currentUser,
        handleSubmit,
        handleChange,
        threadId,
        title,
        mod
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
            <CommentList threadId={threadId} mod={mod} />
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

const mapStateToProps = ({users}) => ({users});

export default connect(mapStateToProps)(ThreadShow);