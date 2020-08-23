import React, { useState } from 'react';
import ClubList from '../components/ClubList';
import { connect } from 'react-redux';
import { addClub } from '../actions/users';
import { logOutUser } from '../actions/users';

import { Button, IconButton, AppBar, Toolbar, Typography, Menu, MenuItem, Link } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/MenuBook';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  menuItem: {
    backgroundColor: '#fff',
    color: '#000',
    marginBottom: theme.spacing(0.25)
  },
  create: {
    backgroundColor: theme.palette.secondary.dark,
    color: '#fff'
  },
  link: {
    color: theme.palette.secondary.dark
  },
  menu: {
    backgroundColor: theme.palette.secondary.main
  }
}));

const CreateClubButton = () => {
  const classes = useStyles();

  return (
    <MenuItem className={classes.create}>
      <Link href='/clubs/new' color='inherit'>
        Create New Club
      </Link>
    </MenuItem>
  );
}

function SidebarContainer({currentUser, logOutUser}) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = e => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={handleMenu} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            The Library
          </Typography>
          {
            currentUser
            ? ( 
              <Button onClick={logOutUser} color='inherit' size='small'>
                <Link href='/' color='inherit' underline='none'>
                  Log Out
                </Link>
              </Button>
            )
            : null
          }
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} className={classes.menuItem}>
              <Link 
                href='/bestsellers'
                underline='none'
                className={classes.link}
              >
                Bestsellers
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose} className={classes.menuItem}>
              <Link
                href='/clubs'
                className={classes.link}
                underline='none'
              >
                Clubs {/* <--------------- link text */}
              </Link>
            </MenuItem>
            <MenuItem >
              Your clubs
            </MenuItem>
            <ClubList styling='sidebar' handleClose={handleClose} />
            <CreateClubButton />
          </Menu>
        </Toolbar>
      </AppBar>
  );
}

const mapStateToProps = ({users}) => ({currentUser: users.currentUser});

export default connect(mapStateToProps, { addClub, logOutUser })(SidebarContainer);