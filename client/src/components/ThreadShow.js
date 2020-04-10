import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputField from './InputField';
import Comment from './Comment';
import CommentList from './CommentList';

class ThreadShow extends Component {

  render() {
    const {comments, users, thread} = this.props
    return (
      <div className='Thread-card'>
        <h1>{thread.title}</h1>
        <CommentList comments={comments} users={users.data} />
        <InputField />
      </div>
    );
  };
}

const mapStateToProps = ({users}) => ({users});


export default connect(mapStateToProps)(ThreadShow);