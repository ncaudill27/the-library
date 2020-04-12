import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from './FormField';
import CommentList from './CommentList';
import { postComment } from '../actions/comments';

class ThreadShow extends Component {

  state = {
    comment: ''
  }

  handleChange = event => {
    this.setState({
      comment: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault()
    const payload = {
      user_id: 11, //Will eventually be currentUser
      board_id: this.props.thread.id,
      content: this.state.comment
    };
    this.props.postComment(payload);
    this.setState({comment: ''});
  }
  
  render() {
    const {comments, users, thread} = this.props
    return (
      <div className='Thread-card'>
        <h3>{thread.title}</h3>
        <CommentList comments={comments} users={users.data} />
        <FormField
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          inputValues={{1: this.state.comment}}
          submitValue="Comment"
        />
      </div>
    );
  };
}

const mapStateToProps = ({users}) => ({users});

export default connect(mapStateToProps, { postComment })(ThreadShow);