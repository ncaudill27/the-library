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
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    // Destructure attributes with Rails namespacing
    const {
      props: {    
        postComment,
        currentUser: {
          id: user_id
        },
        thread: {
          id: board_id
        },
      },
      state: {
        comment: content
      }
    } = this; 

    const payload = {user_id, board_id, content};

    postComment(payload); // POST /comments request
    this.setState({comment: ''}); // Reset form
  }
  
  render() {
    const {
      state: {
        comment
      },
      props: {
        handleSubmit,
        handleChange,
        comments,
        users: {
          data: users
        },
        thread: {
          title
        },
        currentUser,
        currentUser: {
          avatar, username
        }
      }
    } = this;

    return (
      <div className='Thread-card'>
        <h3>{title}</h3>
        <CommentList comments={comments} users={users} currentUser={currentUser}/>
        <CommentField avatar={avatar} username={username} comment={comment} handleSubmit={handleSubmit} handleChange={handleChange} />
      </div>
    );
  };
}

const mapStateToProps = ({users}) => ({users});

export default connect(mapStateToProps, { postComment })(ThreadShow);