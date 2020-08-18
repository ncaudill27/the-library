import React, { useState } from 'react';
import { connect } from 'react-redux';
import { memberJoinRequest, memberLeaveRequest } from '../actions/users';
import ThreadShow from '../components/ThreadShow';
import BookShow from '../components/BookShow';
/* ------------
  Material imports
---------- */
import { Link, Button, Typography, Menu, MenuItem, IconButton } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

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
  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = e => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

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
    ? (
      <MenuItem onClick={handleClose}>
        <Button id='leave' onClick={handleLeave}>
          Leave Club
        </Button>
      </MenuItem>
    )
    : (
      <MenuItem onClick={handleClose}>
        <Button color='primary' id='join' onClick={handleJoin}>
          Join Club
        </Button>
      </MenuItem>
    )
  );


  // TODO fix this
  const renderModOptions = () => <>
    <Button onClick={toggleModding}>
      Current members
    </Button>
    <Button>
      <Link href='/avatar-selection' color='inherit'>
        Choose new avatar
      </Link>
    </Button>
    <Button>
    <Link to='/bestsellers' color='inherit'>
      Set new book
    </Link>
    </Button>
  </>;

  const renderCurrentMembers = () => {
    members = members.map( member => {
        return (
          member.id === currentUser.id
          ? null
          : (
            <div key={member.id} className='member'>
              <p key={member.name}>{member.username}
                <Button key={member.username} onClick={handleLeave}>remove</Button>
              </p>
            </div>
          )
        );
    });
    
    return  (
      <div className='members'>
        <Button onClick={toggleModding}>CLOSE</Button>
        {members}
      </div>
    );
  }

  const ThreadList = () => {
    return threads.map( thread => {
      return (
        <ThreadShow
          key={thread.id}
          {...thread}
          currentUser={currentUser}
          currentUserIsMod={currentUserIsMod}      
        />
      );
    })
  }

  const ClubMenu = () => <>
    {
      !currentUser || (
        <IconButton onClick={handleMenu} edge='end' aria-label='menu'>
          <SettingsIcon />
        </IconButton>
      )
    }
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        top: 'top',
        horizontal: 'right'
      }}
      open={open}
      onClose={handleClose}
    >
      { renderMembershipButton() }
      { !currentUserIsMod || renderModOptions() }
      { !modding || renderCurrentMembers() }
    </Menu>
  </>

  return (
    <div className='Club-container'>
      <ClubMenu />
      <div className='Club-details'>
        <Typography variant="h2">{name}</Typography>
        <Typography variant="subtitle1" paragraph>{description}</Typography>
      </div>
      <BookShow isbn={activeBook} />
      <Typography variant='h3'>
        Threads
      </Typography>
      <ThreadList />
    </div>
  );
}

export default connect( null, { memberJoinRequest, memberLeaveRequest })(ClubContainer);