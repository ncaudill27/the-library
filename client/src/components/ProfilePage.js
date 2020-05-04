import React from 'react';
import { connect } from 'react-redux';
import ProfileClubs from './ProfileClubs';
import CommentList from './CommentList';
import ClubBook from './ClubBook';
// import Book from './Book';

function ProfilePage({
  clubs,
  clubsPending,
  comments,
  commentsPending,
  userPending,
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
console.log(clubs, comments);

  return (
    <div className='Profile'>
      <div className='info'>
        <h2>{name}</h2>
        <p>{bio}</p>
      </div>
    <div className='reading'>
      {/* <Book /> */}
      {userPending ? <p>loading..</p> : <ClubBook isbn={currentlyReading} />}
    </div>
      {/* <div className='clubs'>
        <ProfileClubs clubs={clubs} />
      </div> */}
      <div className='comments'>
        {commentsPending === true ? <p>loading...</p> : <CommentList comments={comments} /> }
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
  userPending: users.pending
});


export default connect(mapStateToProps)(ProfilePage);