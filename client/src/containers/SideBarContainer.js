import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addClub } from '../actions/users';
import UserBox from '../components/UserBox';
import ClubList from '../components/ClubList';
import SideNav from '../components/SideNav';

import { Button, IconButton, AppBar, Toolbar, Typography, Menu, MenuItem, Link } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/MenuBook';
import ClearIcon from '@material-ui/icons/Clear';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));


function SidebarContainer({currentUser}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = e => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={handleMenu} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            { open ? <ClearIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            The Library
          </Typography>
          <Button>Log Out</Button>
          <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={open}
          onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link
                href='/bestsellers'
              >
                Bestsellers {/* <----------- link text */}
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
            <Link
              href='/clubs'
            >
              Clubs {/* <--------------- link text */}
            </Link>
            </MenuItem>
            <MenuItem>
              Your clubs
            </MenuItem>
            <ClubList styling='sidebar' handleClose={handleClose} />
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}

// {
//   !!currentUser
//   ? <>
//     <UserBox user={currentUser} />
//     </>
//   : <SideNav postion='sidebar' />
// }
const mapStateToProps = ({users}) => {
  return {
    currentUser: users.currentUser
  }
};

export default connect(mapStateToProps, { addClub })(SidebarContainer);