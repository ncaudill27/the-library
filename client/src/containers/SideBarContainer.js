import React, { useState } from 'react';
import ClubList from '../components/ClubList';
import { connect } from 'react-redux';
import { addClub } from '../actions/users';
import { logOutUser } from '../actions/users';

import { Button, IconButton, AppBar, Toolbar, Typography, Menu, MenuItem, Link } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/MenuBook';
import ClearIcon from '@material-ui/icons/Clear';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( themes => ({
  root: {
    flexGrow: 1,
    marginBottom: themes.spacing(2)
  },
  menuButton: {
    marginRight: themes.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const WrappedMenuItem = React.forwardRef((props, ref) => (
  <MenuItem onClick={props.handleClose} ref={ref}>
    <Link 
      href={props.href}
      color={props.color}
    >
      {props.text}
    </Link>
  </MenuItem>
) )

function SidebarContainer({currentUser, logOutUser}) {
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
          {
            !currentUser
            ? ( 
              <Button onClick={logOutUser}>
                <Link href='/' color='inherit'>
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

            <MenuItem onClick={handleClose}>
            <Link
              href='/clubs'
              color='inherit'
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

const mapStateToProps = ({users}) => ({currentUser: users.currentUser});

export default connect(mapStateToProps, { addClub, logOutUser })(SidebarContainer);