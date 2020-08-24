import React, { useState } from 'react';
import { connect } from 'react-redux';
import { memberJoinRequest, memberLeaveRequest } from '../actions/users';
import ThreadShow from '../components/ThreadShow';
import ThreadForm from '../components/ThreadForm';
import BookShow from '../components/BookShow';
/* ------------
  Material imports
---------- */
import { makeStyles, Link, Button, Typography, Box, Menu, MenuItem, IconButton } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/MenuBook';

const useStyles = makeStyles( theme => ({
  root: {
    position: 'relative'
  },
  cog: {
    position: 'absolute',
    top: '0',
    right: '0',
  },
  menuItem: {
    backgroundColor: '#fff',
    color: theme.palette.secondary.dark,
    marginBottom: theme.spacing(0.25)
  },
  link: {
    color: theme.palette.secondary.dark
  },
  threads: {
    backgroundColor: theme.palette.primary.main,
    margin: theme.spacing(-2),
    padding: theme.spacing(2)
  }
}))

const MembershipButton = ({currentUserIsMember, handleClose, handleLeave, handleJoin}) => {
  const classes = useStyles();

  return (
    currentUserIsMember
    ? (
      <MenuItem onClick={handleClose} className={classes.menuItem}>
        <Box onClick={handleLeave}>
          Leave Club
        </Box>
      </MenuItem>
    )
    : (
      <MenuItem onClick={handleClose} className={classes.menuItem}>
        <Box onClick={handleJoin}>
          Join Club
        </Box>
      </MenuItem>
    )
  )
};

const ModOptions = ({currentUserIsMod, handleClose, toggleModding}) => {
  const classes = useStyles();

  return (
    currentUserIsMod
    ? <>
        <MenuItem onClose={handleClose, toggleModding} className={classes.menuItem}>
          Current members {/* create modal popout for this */}
        </MenuItem>
        <MenuItem onClose={handleClose} className={classes.menuItem}>
          <Link href='/avatar-selection' color='inherit' underline='none'>
            Choose new avatar
          </Link>
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <Link href='/bestsellers' color='inherit' underline='none'>
            Set new book
          </Link>
        </MenuItem>
      </>
    : null
  )
}

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

const ThreadList = ({currentUser, currentUserIsMember, currentUserIsMod, threads}) => {
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

function ClubContainer({
  id,
  name,
  users,
  threads,
  memberships,
  activeBook,
  currentUser,
  description,
  currentUserIsMod,
  memberJoinRequest,
  memberLeaveRequest,
  currentUserIsMember
}) {

  const classes = useStyles();
  threads = threads.filter( t => t.clubId === id );

  const [modding, setModding] = useState(false);
  const toggleModding = () => setModding( prev => !prev );
  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleMenu = e => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  
  const findMembershipId = ({clubId, userId}) => {
    return memberships.find( m => m.userId === userId && m.clubId === clubId )
    .id;
  }

  const clubMembers = () => {
    // ! optimize this
    // ! clubMemberIds = memberships.map( m => m.clubId !== clubId || m.userId )
    const clubMemberships = memberships.filter( m => m.clubId === id );
    // ! clubMemberIds.map( id => users.find( u => u.id === id ) )
    // ? a way to keep this below O(n2) ?
    const members = clubMemberships.map( m => users.find( u => u.id === m.userId ) );
    return members
  }
  
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
    const members = clubMembers().map( member => {
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

  return (
    <div className={classes.root}>
      <ClubMenu
        child
        open={open}
        anchorEl={anchorEl}
        handleJoin={handleJoin}
        handleMenu={handleMenu}
        handleLeave={handleLeave}
        currentUser={currentUser}
        handleClose={handleClose}
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
          Discussion
        </Typography>
        { currentUserIsMod ? <ThreadForm clubId={id} /> : null }
        {
           threads.length 
           ? (
            <ThreadList
              threads={threads}
              currentUser={currentUser}
              currentUserIsMod={currentUserIsMod}
              currentUserIsMember={currentUserIsMember}
            />
           )
           : null 
        }
      </div>
    </div>
  );
}

const mapStateToProps = ({threads, users}) => ({
  threads: threads.data,
  threadsPending: threads.pending,
  users: users.data,
  usersPending: users.pending,
  currentUser: users.currentUser,
  memberships: users.memberships
})

export default connect( mapStateToProps, { memberJoinRequest, memberLeaveRequest } )(ClubContainer);