import React from 'react';
import { connect } from 'react-redux';
import ClubBook from './ClubBook';

function ProfilePage({
  comments,
  commentsPending,
  usersPending,
  currentUser,
  currentUser: {
    name,
    bio,
    currentlyReading
  }
}) {

  return (
    <div className='Profile'>
      <div className='info'>
        <h2>{name}</h2>
        <p>{bio}</p>
      </div>
      <div className='reading'>
        { currentlyReading ? <ClubBook isbn={currentlyReading} /> : <>loading...</> }
      </div>
    </div>
  );
}

const mapStateToProps = ({users, clubs, comments}) => ({
  clubs: clubs.data.filter(club => club.id === users.currentUser.id),
  comments: comments.data.filter(comment => comment.userId === users.currentUser.id).slice(0,5),
  currentUser: users.currentUser,
  commentsPending: comments.pending,
  clubsPending: clubs.pending,
  usersPending: users.pending
});


export default connect(mapStateToProps)(ProfilePage);