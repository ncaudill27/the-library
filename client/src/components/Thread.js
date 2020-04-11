import React from 'react';
import { NavLink } from 'react-router-dom';
import Comment from './Comment';
import { connect } from 'react-redux';

const Thread = ({id, title, comments, club, users}) => {
  const lastComment = comments.slice(-1)[0]
  const {content, posted, userId} = lastComment
  const user = users.data.find(user => user.id === lastComment.userId)

  return (
    <div className='Thread'>
      <h3>
        <NavLink
          to={`/clubs/${club.id}/thread/${id}`}
          exact
          className='Navlink'
        >{title}</NavLink>
      </h3>
      <strong>Last comment:</strong>
      { user
        ? <Comment avatar={user.avatar} username={user.username} content={content} time={posted.toLocaleString()} />
        : <p>loading...</p>
      }
    </div>
  );
}

const mapStateToProps = ({users}) => ({users});

export default connect(mapStateToProps)(Thread);