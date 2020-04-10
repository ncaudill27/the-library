import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputField from './InputField';
import Comment from './Comment';
import CommentList from './CommentList';
import { postComment } from '../actions/comments';

class ThreadShow extends Component {

  state = {
    content: ''
  }

  handleChange = event => {
    this.setState({
      content: event.target.value
    })
  }
  
  render() {
    const {comments, users, thread, postComment} = this.props
    return (
      <div className='Thread-card'>
        <h3>{thread.title}</h3>
        <CommentList comments={comments} users={users.data} />
        <InputField handleSubmit={postComment} handleChange={this.handleChange} />
      </div>
    );
  };
}

const mapStateToProps = ({users}) => ({users});

export default connect(mapStateToProps, { postComment })(ThreadShow);