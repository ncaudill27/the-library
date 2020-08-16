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
  modding,
  activeBook,
  currentUser,
  description,
  currentUserIsMod,
  memberJoinRequest
}) {

  const [modding, setModding] = useState(false);
  const toggleModding = setModding( prev => !prev );
  
  handleJoin = () => {
    const payload = {
      membership: {
        club_id: id
      }
    };

    memberJoinRequest(payload);
  }

  handleLeave = () => {
    const {
      id,
      memberLeaveRequest,
      currentUser,
      findMembershipId,
      modding,
      toggleModding
    } = this.props;

    const membershipId = findMembershipId({clubId: id, userId: currentUser.id});
    memberLeaveRequest(membershipId);
    if (modding) toggleModding();
  }

  renderMembershipButton = () => 
    this.props.currentUserIsMember
    ? <Button id='leave' onClick={this.handleLeave}>Leave Club</Button>
    : <Button color='primary' id='join' onClick={this.handleJoin}>Join Club</Button>;

    // TODO fix this
  renderModOptions = () => <>
      <button onClick={this.props.toggleModding}>Current members</button>
      <br />
      <button><NavLink to='/avatar-selection' exact>
        Choose new avatar
      </NavLink></button>
      <br />
      <button><NavLink to='/bestsellers' exact>Set new book</NavLink></button>
    </>;

  renderCurrentMembers = () => {
    let { members, toggleModding } = this.props;

    members = members.map( member => {
      return <div key={member.id} className='member'>
        <p key={member.name}>{member.username}
          <button key={member.username} onClick={this.handleLeave}>remove</button>
        </p>
      </div>
    });
    
    return  <div className='members'>
              <button onClick={toggleModding}>CLOSE</button>
              {members}
            </div>;
  }

  render() {
    const {
      renderMembershipButton,
      renderModOptions,
      renderCurrentMembers
    } = this;

    return (
      <div className='Club-container'>
        { currentUserIsMod ? renderModOptions() : null }
        { modding ? renderCurrentMembers() : null }
        <div className='Club-details'>
          <Typography variant="h2">{name}</Typography>
          { currentUser ? renderMembershipButton() : null }
          <Typography variant="subtitle1" paragraph>{description}</Typography>
        </div>
        <BookShow isbn={activeBook} />
        <ThreadList threads={threads} clubId={id} currentUser={currentUser} currentUserIsMod={currentUserIsMod} />
      </div>
    );
  }
}

export default connect( null, { memberJoinRequest, memberLeaveRequest })(ClubContainer);