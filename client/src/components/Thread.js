import React from 'react';
import { NavLink } from 'react-router-dom';
import Comment from './Comment';
import { connect } from 'react-redux';

const Thread = ({id, title, comments, club, users: {data: users}, currentUser}) => {
  const lastComment = comments.slice(-1)[0]
  const {content, posted, userId} = lastComment
  const {avatar, username} = users ? users.find(user => user.id === userId) : {avatar: null, username: null}

  return (
    <div className='Thread'>
      <h3><NavLink to={`/clubs/${club.id}/thread/${id}`} exact className='Navlink'>{title}</NavLink></h3>
      <p>Last comment:</p>
      <Comment avatar={avatar} username={username} content={content} time={posted.toLocaleString()} />
    </div>
  );
}

const mapStateToProps = ({users}) => ({users});

export default connect(mapStateToProps)(Thread);