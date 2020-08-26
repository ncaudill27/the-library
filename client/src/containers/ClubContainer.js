import React, { useState, forwardRef } from 'react';
import { connect } from 'react-redux';
import { memberJoinRequest, memberLeaveRequest } from '../actions/users';
import ThreadShow from '../components/ThreadShow';
import ThreadForm from '../components/ThreadForm';
import BookShow from '../components/BookShow';
/* ------------
  Material imports
---------- */
import { makeStyles, Link, Button, Typography, Box, Menu, MenuItem, Fade, IconButton, Backdrop, Modal } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/MenuBook';

const useStyles = makeStyles( theme => ({
  root: {
    position: 'relative'
  },
  cog: {
    position: 'absolute',
    top: '-24px',
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
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '2px'
  },
  innerModal: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    borderRadius: '2px',
    postion: 'relative'
  },
  kickButton: {
    backgroundColor: theme.palette.secondary.dark,
    color: '#fff',
    margin: theme.spacing(1)
  }
}))

const MembershipButton = forwardRef( ({currentUserIsMember, handleClose, handleLeave, handleJoin}, ref) => {
  const classes = useStyles();

  return (
    currentUserIsMember
    ? (
      <MenuItem onClick={handleClose} className={classes.menuItem} ref={ref}>
        <Box onClick={handleLeave}>
          Leave Club
        </Box>
      </MenuItem>
    )
    : (
      <MenuItem onClick={handleClose} className={classes.menuItem} ref={ref}>
        <Box onClick={handleJoin}>
          Join Club
        </Box>
      </MenuItem>
    )
  );
});

const ManageUsers = ({clubMembers, currentUser, modMembers, toggleModMembers, handleKick}) => {
  const classes = useStyles();

  const members = clubMembers().map( member => {
      return (
        member.id !== currentUser.id && (
          <Box key={member.id} display='flex' justifyContent='space-evenly' alignItems='center'>
              <Typography variant='h5'>
                {member.username}
              </Typography>
              <Button onClick={ () => handleKick(member.id)} variant='contained' className={classes.kickButton}>
                Kick
              </Button>
          </Box>
        )
      );
  });
  
  // if (!modMembers) return null
  return  (
    <Modal
      className={classes.modal}
      open={modMembers}
      onClose={toggleModMembers}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={modMembers}>
        <div className={classes.innerModal}>
          {members}
        </div>
      </Fade>
    </Modal>
  );
}

const ModOptions = ({currentUserIsMod, handleClose, toggleModMembers}) => {
  const classes = useStyles();

  return (
    currentUserIsMod
    ? <>
        <MenuItem onClick={handleClose} className={classes.menuItem}>
          <Box onClick={toggleModMembers}>
            Current members {/* create modal popout for this */}
          </Box>
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

const ClubMenu = ({anchorEl, handleClose, open, handleMenu, currentUser, renderCurrentMembers, currentUserIsMod, currentUserIsMember, handleLeave, handleJoin, toggleModMembers}) => {
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
      <ModOptions currentUserIsMod={currentUserIsMod} handleClose={handleClose} toggleModMembers={toggleModMembers} />
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

  const [modMembers, setModding] = useState(false);
  const toggleModMembers = () => setModding( prev => !prev );
  
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
  }

  const handleKick = userId => {
    memberLeaveRequest(userId);
  }

  return (
    <div className={classes.root}>
      <Typography variant="h2">{name}</Typography>
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
        toggleModMembers={toggleModMembers}
        currentUserIsMember={currentUserIsMember}
      />
      <Typography variant="subtitle1" paragraph>{description}</Typography>
      <BookShow isbn={activeBook} />
      <div className={classes.threads}>
        <Typography variant='h3'>
          Discussion
        </Typography>
        { currentUserIsMod && <ThreadForm clubId={id} /> }
        { threads.length && <ThreadList threads={threads} currentUser={currentUser} currentUserIsMod={currentUserIsMod} currentUserIsMember={currentUserIsMember} /> }
      </div>
      <ManageUsers clubMembers={clubMembers} currentUser={currentUser} modMembers={modMembers} toggleModMembers={toggleModMembers} handleKick={handleKick} />
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