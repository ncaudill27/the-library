import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { memberJoinRequest, memberLeaveRequest } from '../actions/users';
import ThreadList from '../components/ThreadList';
import BookShow from '../components/BookShow';
import { NavLink } from 'react-router-dom';
/* ------------
  Material imports
---------- */
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function ClubContainer({
  id,
  name,
  threads,
  members,
  activeBook,
  currentUser,
  description,
  findMembershipId,
  currentUserIsMod,
  memberJoinRequest,
  memberLeaveRequest,
  currentUserIsMember
}) {

  const [modding, setModding] = useState(false);
  const toggleModding = () => setModding( prev => !prev );
  
  const handleJoin = () => {
    const payload = {
      membership: {
        club_id: id
      }
    };

    memberJoinRequest(payload);
  }

  const handleLeave = () => {
    const membershipId = findMembershipId({clubId: id, userId: currentUser.id});
    memberLeaveRequest(membershipId);
    if (modding) toggleModding();
  }

  const renderMembershipButton = () => (
    currentUserIsMember
    ? <Button id='leave' onClick={handleLeave}>Leave Club</Button>
    : <Button color='primary' id='join' onClick={handleJoin}>Join Club</Button>
  );


  // TODO fix this
  const renderModOptions = () => <>
    <button onClick={toggleModding}>Current members</button>
    <button><NavLink to='/avatar-selection' exact>
      Choose new avatar
    </NavLink></button>
    <button><NavLink to='/bestsellers' exact>Set new book</NavLink></button>
  </>;

  const renderCurrentMembers = () => {
    members = members.map( member => {
      return <div key={member.id} className='member'>
        <p key={member.name}>{member.username}
          <button key={member.username} onClick={handleLeave}>remove</button>
        </p>
      </div>
    });
    
    return  (
      <div className='members'>
        <button onClick={toggleModding}>CLOSE</button>
        {members}
      </div>
    );
  }

  return (
    <div className='Club-container'>
      { !currentUserIsMod || renderModOptions() }
      { !modding || renderCurrentMembers() }
      <div className='Club-details'>
        <Typography variant="h2">{name}</Typography>
        { !currentUser || renderMembershipButton() }
        <Typography variant="subtitle1" paragraph>{description}</Typography>
      </div>
      <BookShow isbn={activeBook} />
      <ThreadList threads={threads} clubId={id} currentUser={currentUser} currentUserIsMod={currentUserIsMod} />
    </div>
  );
}

export default connect( null, { memberJoinRequest, memberLeaveRequest })(ClubContainer);