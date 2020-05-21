import React from 'react';
import { connect } from 'react-redux';
import ProfileClubs from './ProfileClubs';
import CommentList from './CommentList';
import ClubBook from './ClubBook';
// import Book from './Book';

function ProfilePage({
  clubs,
  comments,
  commentsPending,
  usersPending,
  currentUser: {
    id,
    name,
    username,
    email,
    bio,
    avatar,
    currentlyReading
  }
}) {
console.log(currentlyReading);

  return (
    <div className='Profile'>
      <div className='info'>
        <h2>{name}</h2>
        <p>{bio}</p>
      </div>
    <div className='reading'>
      {/* <Book /> */}
      { !currentlyReading ? <>loading...</> : <ClubBook isbn={currentlyReading} /> }
    </div>
      <div className='comments'>
        {!commentsPending && !usersPending ?  <CommentList comments={comments} /> : <>loading...</>}
      </div>
    </div>
  )
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