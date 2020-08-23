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
  },
  threads: {
    backgroundColor: theme.palette.primary.light,
    margin: theme.spacing(-2),
    padding: theme.spacing(2)
  }
}))

const MembershipButton = ({currentUserIsMember, handleClose, handleLeave, handleJoin}) => (
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

const ModOptions = ({currentUserIsMod, handleClose, toggleModding}) => (
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

const ClubMenu = ({anchorEl, handleClose, open, handleMenu, currentUser, renderCurrentMembers, currentUserIsMod, currentUserIsMember, handleLeave, handleJoin, toggleModding}) => {
  const classes = useStyles();

  return <>
    {
      currentUser
      ? (
        <IconButton onClick={handleMenu} edge='end' aria-label='menu' className={classes.cog}>
          <SettingsIcon color='secondary' />
        </IconButton>
      )
      : null
    }
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom', 
        horizontal: 'right'
      }}
      open={open}
      onClose={handleClose}
      getContentAnchorEl={null}
    >
      <MembershipButton currentUserIsMember={currentUserIsMember} handleLeave={handleLeave} handleJoin={handleJoin} handleClose={handleClose} />
      <ModOptions currentUserIsMod={currentUserIsMod} handleClose={handleClose} toggleModding={toggleModding} />
      { renderCurrentMembers() }
    </Menu>
  </>
}

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

  const ThreadList = ({currentUser, currentUserIsMember, currentUserIsMod}) => {
    return threads.map( thread => {
      return (
        <ThreadShow
          key={thread.id}
          {...thread}
          currentUser={currentUser}
          currentUserIsMod={currentUserIsMod}      
          currentUserIsMember={currentUserIsMember}
        />
      );
    })
  }

  return (
    <div className={classes.root}>
      <ClubMenu
        anchorEl={anchorEl}
        handleJoin={handleJoin}
        handleMenu={handleMenu}
        handleLeave={handleLeave}
        currentUser={currentUser}
        handleClose={handleClose} open={open}
        currentUserIsMod={currentUserIsMod}
        currentUserIsMember={currentUserIsMember}
        renderCurrentMembers={renderCurrentMembers}
      />
      <div className='Club-details'>
        <Typography variant="h2">{name}</Typography>
        <Typography variant="subtitle1" paragraph>{description}</Typography>
      </div>
      <BookShow isbn={activeBook} />
      <div className={classes.threads}>
        <Typography variant='h3'>
          Threads
        </Typography>
        { currentUserIsMod ? <ThreadForm clubId={id} /> : null }
        { threads.length ? <ThreadList currentUserIsMember={currentUserIsMember} currentUser={currentUser} currentUserIsMod={currentUserIsMod} /> : null }
      </div>
    </div>
  );
}

export default connect( null, { memberJoinRequest, memberLeaveRequest })(ClubContainer);