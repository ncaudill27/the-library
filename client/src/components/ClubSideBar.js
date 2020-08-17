import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

const ClubSideBar = ({id, name, avatar}) =>
  <Link href={`/clubs/${id}`} noWrap color='inherit'>
    <Box display='flex' alignItems='center'>
      <Avatar src={avatar} alt={name + "'s avatar"} />
      {name}
    </Box>
  </Link>;

export default ClubSideBar;