import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputField from './InputField';
import CommentList from './CommentList';
import { postComment } from '../actions/comments';

class ThreadShow extends Component {

  state = {
    content: ''
  }

  handleChange = event => {
    this.setState({
      content: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault()
    const payload = {
      user_id: '32', //Will eventually be currentUser
      board_id: this.props.thread.id,
      content: this.state.content
    };
    this.props.postComment(payload);
    this.setState({content: ''});
  }
  
  render() {
    const {comments, users, thread} = this.props
    return (
      <div className='Thread-card'>
        <h3>{thread.title}</h3>
        <CommentList comments={comments} users={users.data} />
        <InputField
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          input={this.state.content}
          value="Comment"
        />
      </div>
    );
  };
}

const mapStateToProps = ({users}) => ({users});

export default connect(mapStateToProps, { postComment })(ThreadShow);