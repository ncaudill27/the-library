import React from 'react';
import { connect } from 'react-redux';
import ProfileClubs from './ProfileClubs';
import CommentList from './CommentList';
import Book from './Book';

function ProfilePage({clubs, comments, currentUser: {
  id, name, username, email, bio,
  avatar, currentlyReading
}}) {

  return (
    <div className='Profile'>
      <div className='info'>
        <h2>{name}</h2>
        <p>{bio}</p>
      </div>
    <div className='reading'>
      {/* <Book /> */}
    </div>
      <div className='clubs'>
        <ProfileClubs clubs={clubs} />
      </div>
      <div className='comments'>
        <CommentList comments={comments} />
      </div>
    </div>
  )
}

const mapStateToProps = ({users, clubs, comments}) => ({
  clubs: clubs.data.filter(club => club.id === users.currentUser.id),
  comments: comments.data.filter(comment => comment.id === users.currentUser.id),
  currentUser: users.currentUser
});


export default connect(mapStateToProps)(ProfilePage);