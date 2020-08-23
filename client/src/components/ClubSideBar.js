import React from 'react';
import { makeStyles, Avatar, Link, Box, MenuItem } from '@material-ui/core';

const useStyles = makeStyles( theme => ({
  menuItem: {
    backgroundColor: '#fff',
    color: '#000',
    marginBottom: theme.spacing(0.25)
  },
  link: {
    color: theme.palette.secondary.dark
  },
}))

const ClubSideBar = ({id, name, avatar, handleClose}) => {
  const classes = useStyles();
  
  return (
    <MenuItem onClick={handleClose} className={classes.menuItem}>
      <Link href={`/clubs/${id}`} noWrap className={classes.link} underline='none'>
        <Box display='flex' alignItems='center'>
          <Avatar src={avatar} alt={name + "'s avatar"} />
          {name}
        </Box>
      </Link>
    </MenuItem>
    
  );
}

export default ClubSideBar;