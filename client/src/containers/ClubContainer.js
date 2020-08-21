import React, { useState } from 'react';
import { connect } from 'react-redux';
import { memberJoinRequest, memberLeaveRequest } from '../actions/users';
import ThreadShow from '../components/ThreadShow';
import ThreadForm from '../components/ThreadForm';
import BookShow from '../components/BookShow';
/* ------------
  Material imports
---------- */
import { makeStyles, Link, Button, Typography, Menu, MenuItem, IconButton } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles( theme => ({
  root: {
    position: 'relative'
  },
  cog: {
    position: 'absolute',
    top: '0',
    right: '0',
  }
}))
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

  const classes = useStyles();

  const [modding, setModding] = useState(false);
  const toggleModding = () => setModding( prev => !prev );
  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  console.log(anchorEl);
  
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

  const MembershipButton = () => (
    currentUserIsMember
    ? (
      <MenuItem onClick={handleClose, handleLeave}>
        Leave Club
      </MenuItem>
    )
    : (
      <MenuItem onClick={handleClose, handleJoin}>
        Join Club
      </MenuItem>
    )
  );

  const ModOptions = () => (
    currentUserIsMod
    ? <>
        <MenuItem onClose={handleClose, toggleModding}>
          Current members {/* create modal popout for this */}
        </MenuItem>
        <MenuItem onClose={handleClose}>
          <Link href='/avatar-selection' color='inherit'>
            Choose new avatar
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href='/bestsellers' color='inherit'>
            Set new book
          </Link>
        </MenuItem>
      </>
    : null
  )

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
      modding
      ? <>
        <Button onClick={toggleModding}>CLOSE</Button>
        {members}
      </>
      : null
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
        <IconButton onClick={handleMenu} edge='end' aria-label='menu' className={classes.cog}>
          <SettingsIcon color='secondary' />
        </IconButton>
      )
    }
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        top: 'bottom', 
        horizontal: 'right'
      }}
      open={open}
      onClose={handleClose}
      getContentAnchorEl={null}
    >
      <MembershipButton />
      <ModOptions />
      { renderCurrentMembers() }
    </Menu>
  </>

  return (
    <div className={classes.root}>
      <ClubMenu />
      <div className='Club-details'>
        <Typography variant="h2">{name}</Typography>
        <Typography variant="subtitle1" paragraph>{description}</Typography>
      </div>
      <BookShow isbn={activeBook} />
      <Typography variant='h3'>
        Threads
      </Typography>
      { !currentUserIsMod || <ThreadForm clubId={id} />} {/* //! not rendering on creation */}
      <ThreadList />
    </div>
  );
}

export default connect( null, { memberJoinRequest, memberLeaveRequest })(ClubContainer);