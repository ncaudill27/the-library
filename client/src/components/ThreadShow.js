import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentList from './CommentList';
import { postComment } from '../actions/comments';
import CommentField from './CommentField';

class ThreadShow extends Component {

  state = {
    comment: ''
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    }, ()=> console.log(this.state));
  };

  handleSubmit = event => {
    event.preventDefault()
    const {currentUser: {id: user_id}, thread: {id: board_id}, postComment} = this.props;
    const {comment: content} = this.state;
    const payload = {user_id, board_id, content};

    postComment(payload);
    this.setState({comment: ''});
  }
  
  render() {
    const {comments, users: {data: users}, thread: {title}, currentUser, currentUser: {avatar, username}} = this.props;
    return (
      <div className='Thread-card'>
        <h3>{title}</h3>
        <CommentList comments={comments} users={users} currentUser={currentUser}/>
        <CommentField avatar={avatar} username={username} comment={this.state.comment} handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
      </div>
    );
  };
}

const mapStateToProps = ({users}) => ({users});

export default connect(mapStateToProps, { postComment })(ThreadShow);