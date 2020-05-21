import React from 'react';
import { connect } from 'react-redux';
import CommentList from './CommentList';
import ClubBook from './ClubBook';

function ProfilePage({
  comments,
  commentsPending,
  usersPending,
  currentUser: {
    name,
    bio,
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